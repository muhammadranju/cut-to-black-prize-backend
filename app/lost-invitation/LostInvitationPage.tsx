"use client";
import ContentWrapper from "@/components/content-wrapper";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/lib/config";
import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function InvitationCodePage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add this state
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setError("");
    setIsSubmitting(true);

    // Validate email is not empty
    if (!email.trim()) {
      setError("Please enter your email address");
      setIsSubmitting(false);
      return;
    }

    // Validate email format (assuming validateEmail is defined, e.g., regex)
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${API_URL}/invitation/forget-invite-code`,
        { email: email.trim() }, // Trim here too
        {
          headers: {
            "Content-Type": "application/json",
            // Add auth if needed: Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data; // Axios wraps in response.data

      if (data.success) {
        setIsLoading(false);
        toast.success(`Recovery code sent to ${email}`);
        setOpen(true);
        setEmail(""); // Clear only on success
        setTimeout(() => {
          router.push("/submit");
        }, 2500); // Delay to show success message
      } else if (data.status === 404 || data.error?.includes("not found")) {
        setIsLoading(false);
        setError("Email not found");
      } else if (data.message === "Email not registered" || data.error) {
        setIsLoading(false);
        setError(data.message || data.error || "Something went wrong");
      } else {
        setIsLoading(false);
        setError("Unexpected response from server");
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error("API Error:", error); // Debug: Full error
      if (error.response?.status === 404) {
        toast.error("Email not found");
      } else if (error.response?.status === 400) {
        setError(error.response.data.message || "Invalid email format");
      } else if (error.response?.status >= 500) {
        setError("Server error. Please try again later");
      } else {
        setError("Network error. Check your connection");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleEmailChange = (value: string) => {
    setEmail(value);
    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  return (
    <ContentWrapper>
      <div className="w-full max-w-3xl mx-auto space-y-12 border border-gray-700 rounded-lg p-8 md:p-12 bg-[#1a1a1a]">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-white md:text-2xl lg:text-3xl font-bold text-xl tracking-wide">
            ENTER YOU EMAIL ADDRESS TO RECOVER YOUR INVITATION CODE
          </h1>
        </div>

        {/* Invitation Code Form */}
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-white text-lg block">
              Email Address<span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              placeholder="Enter Your Email Address"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              className="w-full h-12 bg-transparent border border-gray-600 text-white placeholder:text-gray-500 rounded-lg px-4"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <div className="flex items-center justify-end gap-2 -mt-3  hover:text-yellow-500">
              <Link href="/submit" className="flex items-center gap-2 text-xs">
                <ArrowLeft className=" w-4 h-4 -mr-2" /> Back to the form to
                submit your screenplay
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button
              onClick={handleSubmit}
              className="max-w-sm w-full h-12 font-bold text-black"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>REQUESTING...</span>
                </div>
              ) : (
                "REQUEST RECOVERY CODE"
              )}
            </Button>
          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center pt-4">
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Once you've entered your email address, we'll send you a recovery
            code and you can use it to recover your invitation code.
          </p>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white">
          <DialogHeader className="flex items-center justify-between">
            <DialogTitle className="text-xl w-4/6 font-bold text-center text-black">
              Successfully Send Invitation Code
            </DialogTitle>
            <Image
              src="/success.gif"
              alt="Success"
              width={100}
              height={100}
              className=""
            />
            <DialogDescription className="text-center w-4/5 text-black/80">
              We've sent your invitation code to your email address. Please
              check your inbox for the email.
            </DialogDescription>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setOpen(false)}
                className="px-8"
              >
                Close
              </Button>
            </DialogTrigger>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </ContentWrapper>
  );
}
