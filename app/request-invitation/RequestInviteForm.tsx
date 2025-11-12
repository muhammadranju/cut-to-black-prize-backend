"use client";
import ContentWrapper from "@/components/content-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/lib/config";
import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Checkbox } from "@radix-ui/react-checkbox";

export default function RequestInviteForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    brief: "",
    interested: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    brief: "",
    interested: "",
  });

  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    const newErrors = {
      fullName: "",
      email: "",
      brief: "",
      interested: "",
    };

    // Validate Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
    }

    // Validate Email
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate Brief
    if (!formData.brief.trim()) {
      newErrors.brief = "Please enter your brief";
    }

    // Validate Why Interested
    if (!formData.interested.trim()) {
      newErrors.interested = "Please enter why you are interested";
    }

    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some((error) => error !== "");

    if (!hasErrors) {
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          `${API_URL}/invitation`,
          {
            fullName: formData.fullName,
            email: formData.email,
            brief: formData.brief,
            interested: formData.interested,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("__ACCESS-TOKEN")}`,
            },
          }
        );

        if (data.success) {
          setIsLoading(false);
          toast.success("Invitation code sent successfully!");
          router.push("/submit");
          setFormData({
            fullName: "",
            email: "",
            brief: "",
            interested: "",
          });
        }
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  return (
    <ContentWrapper>
      <div className="w-full max-w-4xl mx-auto border border-gray-700 rounded-lg p-8 md:p-12 bg-[#1a1a1a]">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-white md:text-2xl lg:text-3xl font-bold text-xl tracking-wide">
            Request an Invitation
          </h1>
        </div>
        <p className="mb-12 mt-5 text-neutral-100 text-base">
          Cut to Black Prize is invitation only. If you would like to be
          considered, complete a short request form. We keep the field small so
          every invited script receives a deep, blind read from working
          producers and analysts.
          <br />
          <br />
          We review requests regularly will and notify you of your status as
          soon as possible. If invited, you will receive a private submission
          link and deadlines.
          <br />
          <br />
          Start your request now and put your best work forward.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Full Name Field */}
          <div className="space-y-3">
            <label className="text-white text-lg block">
              Full Name<span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter Your Full Name"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className="w-full h-12 bg-transparent border border-gray-600 text-white placeholder:text-gray-500 rounded-lg px-4"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-3">
            <label className="text-white text-lg block">
              Email<span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full h-12 bg-transparent border border-gray-600 text-white placeholder:text-gray-500 rounded-lg px-4"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Brief Field */}
          <div className="space-y-3">
            <label className="text-white text-lg block">
              Brief<span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Type your brief here..."
              value={formData.brief}
              onChange={(e) => handleChange("brief", e.target.value)}
              rows={4}
              cols={50}
              className="w-full min-h-[220px] bg-transparent border border-gray-600 text-white placeholder:text-gray-500 rounded-lg px-4 py-3 resize-none"
            ></textarea>
            {errors.brief && (
              <p className="text-red-500 text-sm mt-1">{errors.brief}</p>
            )}
          </div>

          {/* Why Interested Field */}
          <div className="space-y-3">
            <label className="text-white text-lg block">
              Why Interested<span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Type your why interested here..."
              value={formData.interested}
              onChange={(e) => handleChange("interested", e.target.value)}
              rows={4}
              cols={50}
              className="w-full min-h-[220px] bg-transparent border border-gray-600 text-white placeholder:text-gray-500 rounded-lg px-4 py-3 resize-none"
            ></textarea>
            {errors.interested && (
              <p className="text-red-500 text-sm mt-1">{errors.interested}</p>
            )}
            {/* Terms Checkbox */}
            <div className="flex items-center justify-between gap-2 -mt-3  ">
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
              <Link href="/submit" className="flex items-center gap-2 text-xs">
                <ArrowLeft className=" w-4 h-4 -mr-2" /> You already have an
                invite code?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col items-center justify-center pt-2 space-y-3">
            <Button
              type="submit"
              className="max-w-sm w-full h-12 font-bold text-black"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>REQUESTING INVITE...</span>
                </div>
              ) : (
                "REQUEST INVITE"
              )}
            </Button>
          </div>
        </form>
      </div>
    </ContentWrapper>
  );
}
