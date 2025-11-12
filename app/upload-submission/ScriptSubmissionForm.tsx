"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Loader2, Upload } from "lucide-react";
import ContentWrapper from "@/components/content-wrapper";
import { Card } from "@/components/ui/card";
import Link from "next/link";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { API_URL } from "@/lib/config";
interface FormData {
  scriptTitle: string;
  logline: string;
  genre: string;
  scriptLength: string;
  file: File | null;
}

interface FormErrors {
  scriptTitle: string;
  logline: string;
  genre: string;
  scriptLength: string;
  file: string;
}

export default function ScriptSubmissionForm() {
  const [formData, setFormData] = useState<FormData>({
    scriptTitle: "",
    logline: "",
    genre: "",
    scriptLength: "",
    file: null,
  });
  const [errors, setErrors] = useState<FormErrors>({
    scriptTitle: "",
    logline: "",
    genre: "",
    scriptLength: "",
    file: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<{
    fullName?: string;
    email?: string;
  } | null>(null);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const raw = localStorage.getItem("userData");
        setUserData(raw ? JSON.parse(raw) : null);
      }
    } catch (e) {
      setUserData(null);
    }
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setErrors((prev) => ({
          ...prev,
          file: "Please upload a PDF file",
        }));
        return;
      }
      if (file.size > 20 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          file: "File size must be less than 20MB",
        }));
        return;
      }
      setFormData((prev) => ({
        ...prev,
        file: file,
      }));
      setErrors((prev) => ({
        ...prev,
        file: "",
      }));
    }
  };

  const handleSubmit = async () => {
    // Reset errors
    const newErrors: FormErrors = {
      scriptTitle: "",
      logline: "",
      genre: "",
      scriptLength: "",
      file: "",
    };

    // Validate Script Title
    if (!formData.scriptTitle.trim()) {
      newErrors.scriptTitle = "Please enter the script title";
    }

    // Validate Logline
    if (!formData.logline.trim()) {
      newErrors.logline = "Please enter the logline";
    }

    // Validate Genre
    if (!formData.genre) {
      newErrors.genre = "Please select a genre";
    }

    // Validate Script Length
    if (!formData.scriptLength) {
      newErrors.scriptLength = "Please select the script length";
    }

    // Validate File
    if (!formData.file) {
      newErrors.file = "Please upload your script PDF";
    } else if (formData.file.type !== "application/pdf") {
      newErrors.file = "Please upload a valid PDF file";
    } else if (formData.file.size > 5 * 1024 * 1024) {
      // 5MB limit example
      newErrors.file = "File size must be less than 5MB";
    }

    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some((error) => error !== "");

    if (!hasErrors) {
      try {
        setIsLoading(true);
        // Create FormData for file upload
        const formDataToSend = new FormData();
        formDataToSend.append("scriptTitle", formData.scriptTitle.trim());
        formDataToSend.append("logline", formData.logline.trim());
        formDataToSend.append("genre", formData.genre);
        formDataToSend.append("lengthCategory", formData.scriptLength);
        formDataToSend.append("pdf", formData.file as any); // File object
        formDataToSend.append("inviteCode", Cookies.get("__INVITE-CODE") || "");

        const { data } = await axios.post(
          `${API_URL}/submission`,
          formDataToSend
        );

        if (data.success) {
          setIsLoading(false);
          router.push("/thank-you");
          console.log("Success Response:", data);
          toast.success(data.message || "Submission uploaded successfully!");
          // Cookies.remove("__INVITE-CODE");
          // Cookies.remove("__INVITE-CODE-VERIFIED");
          // Cookies.remove("__INVITE-CODE-TIMESTAMP");

          // Clear form on success
          setFormData({
            scriptTitle: "",
            logline: "",
            genre: "",
            scriptLength: "",
            file: null,
          });
        }
      } catch (error: any) {
        setIsLoading(false);
        console.error("Upload Error:", error);

        if (error.response?.status === 400 || error.response?.status === 422) {
          toast.error(error.response.data.message || "Invalid form data");
        } else if (error.response?.status === 413) {
          toast.error("File too large. Please upload a smaller PDF");
        } else if (error.response?.status === 500) {
          toast.error("Server error. Please try again later");
        } else {
          toast.error(error.message || "Upload failed. Please try again");
        }
      }
    }
  };
  useEffect(() => {
    if (!Cookies.get("__INVITE-CODE")) {
      router.push("/submit");
    }
  }, [formData]);

  return (
    <ContentWrapper>
      {/* Header */}

      <Card className="w-full max-w-4xl mx-auto  rounded-lg p-8 md:p-12 border border-gray-700 ">
        <div className="text-center space-y-3">
          <h1 className="text-white md:text-2xl lg:text-3xl font-bold text-xl tracking-wide">
            Cut to Black Prize Invitation Request
          </h1>
        </div>
        <p>
          Cut to Black Prize is a small, curated competition for writers who
          value craft and real access. Because invitations are limited, we ask
          prospective entrants to complete a short pre-screening questionnaire.
          It helps us confirm fit, keep the field tight, and ensure every
          invited script receives a deep, blind read from working producers and
          analysts.
          <br />
          <br />
          The questionnaire focuses on the essentials only: your logline, format
          and page count, a brief background snapshot, and your goals for the
          next year. It takes just a few minutes and directly informs our
          invitation decisions. If you were referred or are part of our
          mentorship community, this is the fastest path to the submission link.
          <br />
          <br />
          Ready to be considered for an invitation? Complete the pre-screening
          questionnaire now.
          <br />
          <br />
        </p>
        <p>
          <strong>Note:</strong>{" "}
          <small>
            You may follow up after submitting this form by emailing
          </small>{" "}
          <br />
          <strong>invites@cuttoblackprize.com</strong>{" "}
          <small>
            with any additional information that may help
            <br /> our evaluation. Keep the email under 500 words. Emails over
            500 words will be automatically deleted. Do not include attachments
            or links.
          </small>
        </p>

        <div className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-white text-base block">Full Name</label>
            <Input
              type="text"
              placeholder="Your Name"
              value={userData?.fullName ?? ""}
              className="w-full h-12 bg-transparent border border-gray-600 text-white placeholder:text-gray-500 rounded-lg px-4"
              disabled={true}
            />
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <label className="text-white text-base block">Email Address</label>
            <Input
              type="email"
              placeholder="Jhon@gmial.com"
              value={userData?.email ?? ""}
              className="w-full h-12 bg-transparent border border-gray-600 text-white placeholder:text-gray-500 rounded-lg px-4"
              disabled={true}
            />
          </div>

          {/* Script Title */}
          <div className="space-y-2">
            <label className="text-white text-base block">
              Script Title<span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Titleof Your Screenplay"
              value={formData.scriptTitle}
              onChange={(e) => handleChange("scriptTitle", e.target.value)}
              className="w-full h-12 bg-transparent border border-gray-600 text-white placeholder:text-gray-500 rounded-lg px-4"
            />
            {errors.scriptTitle && (
              <p className="text-red-500 text-sm mt-1">{errors.scriptTitle}</p>
            )}
          </div>

          {/* Logline */}
          <div className="space-y-2">
            <label className="text-white text-base block">
              Logline<span className="text-red-500">*</span>
            </label>
            <Textarea
              placeholder="Type Here..."
              value={formData.logline}
              onChange={(e) => handleChange("logline", e.target.value)}
              className="w-full min-h-[100px] bg-transparent border border-gray-600 text-white placeholder:text-gray-500 rounded-lg px-4 py-3 resize-none"
            />
            {errors.logline && (
              <p className="text-red-500 text-sm mt-1">{errors.logline}</p>
            )}
          </div>

          {/* Genre and Script Length */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Genre */}
            <div className="space-y-2">
              <label className="text-white text-base block">
                Genre<span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.genre}
                onValueChange={(value) => handleChange("genre", value)}
              >
                <SelectTrigger className="w-full h-12  border border-gray-600 text-white rounded-lg px-4 py-6">
                  <SelectValue placeholder="Select a Genre" />
                </SelectTrigger>
                <SelectContent className="bg-card border border-gray-600 rounded-lg">
                  <SelectItem value="drama" className="text-white">
                    Drama
                  </SelectItem>
                  <SelectItem value="comedy" className="text-white">
                    Comedy
                  </SelectItem>
                  <SelectItem value="fantasy" className="text-white">
                    Fantasy
                  </SelectItem>
                  <SelectItem value="horror" className="text-white">
                    Horror
                  </SelectItem>
                  <SelectItem value="sci-fi" className="text-white">
                    Sci-Fi
                  </SelectItem>
                  <SelectItem value="other" className="text-white">
                    Other
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.genre && (
                <p className="text-red-500 text-sm mt-1">{errors.genre}</p>
              )}
            </div>

            {/* Script Length */}
            <div className="space-y-2">
              <label className="text-white text-base block">
                Script Length<span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.scriptLength}
                onValueChange={(value) => handleChange("scriptLength", value)}
              >
                <SelectTrigger className="w-full h-12 bg-transparent border border-gray-600 text-white rounded-lg px-4 py-6">
                  <SelectValue placeholder="Select Length" />
                </SelectTrigger>
                <SelectContent className=" border border-gray-600">
                  <SelectItem value="short" className="text-white">
                    Short (1-30 pages)
                  </SelectItem>
                  <SelectItem value="medium" className="text-white">
                    Medium (31-60 pages)
                  </SelectItem>
                  <SelectItem value="feature" className="text-white">
                    Feature (61-120 pages)
                  </SelectItem>
                  <SelectItem value="long" className="text-white">
                    Long (120+ pages)
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.scriptLength && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.scriptLength}
                </p>
              )}
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <label className="text-white text-base block">
              Script (PDF,Max X 20MB)<span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 flex flex-col items-center justify-center min-h-[180px]">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                onClick={handleFileClick}
                type="button"
                className="bg-yellow-600 hover:bg-yellow-700 text-white rounded-full w-12 h-12 flex items-center justify-center mb-3"
              >
                <Upload className="w-5 h-5" />
              </Button>
              <p className="text-gray-400 text-sm">
                <span
                  className="text-yellow-500 cursor-pointer"
                  onClick={handleFileClick}
                >
                  Click here
                </span>{" "}
                to upload your PDF
              </p>
              {formData.file && (
                <p className="text-yellow-500 text-sm mt-2">
                  Selected: {formData.file.name}
                </p>
              )}
            </div>
            {errors.file && (
              <p className="text-red-500 text-sm mt-1">{errors.file}</p>
            )}
            {/* Terms Checkbox */}
            <div className="flex items-center justify-between gap-2 mt-3  ">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="border-gray-600 data-[state=checked]:bg-white data-[state=checked]:text-black"
                />
                <label
                  htmlFor="terms"
                  className="text-white text-sm cursor-pointer "
                >
                  I agree to{" "}
                  <Link
                    href="/terms-conditions"
                    className=" underline underline-offset-2 text-blue-500"
                  >
                    Terms and Conditions
                  </Link>{" "}
                  by requesting invite.
                </label>
              </div>
            </div>
          </div>

          <small className="text-neutral-400 text-sm my-2 w-1/2 mx-auto">
            By submitting this form, you are consenting to receive marketing
            emails from Call Sheet Media. You can revoke your consent to receive
            emails at any time by using the Safe Unsubscribe® link, found at the
            bottom of every email.
          </small>

          <div className="flex flex-col items-center justify-center pt-2 space-y-3">
            <Button
              onClick={handleSubmit}
              type="button"
              className="max-w-sm w-full h-12 font-bold text-black"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>SUBMITTING...</span>
                </div>
              ) : (
                "SUBMIT SCREENPLAY"
              )}
            </Button>
            {/* <p className="text-gray-400 text-sm mt-1">
              By submitting, you agree to our{" "}
              <Link
                href="/terms-conditions"
                className="text-yellow-500 hover:text-yellow-400 underline font-medium"
              >
                Terms and Conditions
              </Link>
            </p> */}
          </div>
          <p>
            Please verify your entries before submitting. Submit only one invite
            request. By applying, you agree to all terms and conditions of Cut
            to Black Prize and Call Sheet Media LLC. Cut to Black Prize is
            sponsored by Call Sheet Media, LLC.
          </p>
        </div>
      </Card>
    </ContentWrapper>
  );
}
