"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_URL } from "@/lib/config";
import axios from "axios";
import { AlertCircle, CheckCircle, Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AccountPage() {
  // Password change states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/(?=.*\d)/.test(password)) {
      return "Password must contain at least one number";
    }
    return "";
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
    setPasswordErrors((prev) => ({ ...prev, [field]: "" }));
    setSuccessMessage("");
  };

  const handleSubmitPassword = async () => {
    let hasError = false;

    const errors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (!passwordData.currentPassword) {
      errors.currentPassword = "Current password is required";
      hasError = true;
    }

    const newPasswordError = validatePassword(passwordData.newPassword);
    if (newPasswordError) {
      errors.newPassword = newPasswordError;
      hasError = true;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      hasError = true;
    }

    if (hasError) {
      setPasswordErrors(errors);
      return;
    }

    const { data } = await axios.post(
      `${API_URL}/auth/change-password`,
      {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        confirmPassword: passwordData.confirmPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("__ACCESS-TOKEN")}`,
        },
      }
    );

    console.log(data);

    setSuccessMessage("Password changed successfully!");
    toast.success("Password changed successfully!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const getInputClassName = (error: string) => {
    if (error) {
      return "border-destructive focus-visible:ring-destructive";
    }
    return "";
  };

  const getPasswordRequirementClass = (condition: boolean) => {
    return condition
      ? "text-green-600 flex items-center gap-1"
      : "text-muted flex items-center gap-1";
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-accent mb-2">
          Account Settings
        </h1>
        <p className="text-muted">Manage your account details and security</p>
      </div>

      {/* Change Password Section */}
      <Card>
        <CardHeader className="border-b border-border">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            <CardTitle className="text-xl">Change Password</CardTitle>
          </div>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {successMessage && (
            <Alert className="border-green-500/20 bg-green-500/5">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-green-600 font-medium">
                {successMessage}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-5">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    handlePasswordChange("currentPassword", e.target.value)
                  }
                  className={getInputClassName(passwordErrors.currentPassword)}
                  placeholder="Enter your current password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full p-0 hover:bg-transparent"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {passwordErrors.currentPassword && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {passwordErrors.currentPassword}
                </div>
              )}
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    handlePasswordChange("newPassword", e.target.value)
                  }
                  className={getInputClassName(passwordErrors.newPassword)}
                  placeholder="Enter your new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full p-0 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {passwordErrors.newPassword && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {passwordErrors.newPassword}
                </div>
              )}
              {!passwordErrors.newPassword && passwordData.newPassword && (
                <div className="space-y-2 pt-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    Password must contain:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div
                      className={getPasswordRequirementClass(
                        passwordData.newPassword.length >= 8
                      )}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          passwordData.newPassword.length >= 8
                            ? "bg-green-500"
                            : "bg-muted"
                        }`}
                      ></div>
                      8+ characters
                    </div>
                    <div
                      className={getPasswordRequirementClass(
                        /(?=.*[a-z])/.test(passwordData.newPassword)
                      )}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          /(?=.*[a-z])/.test(passwordData.newPassword)
                            ? "bg-green-500"
                            : "bg-muted"
                        }`}
                      ></div>
                      Lowercase letter
                    </div>
                    <div
                      className={getPasswordRequirementClass(
                        /(?=.*[A-Z])/.test(passwordData.newPassword)
                      )}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          /(?=.*[A-Z])/.test(passwordData.newPassword)
                            ? "bg-green-500"
                            : "bg-muted"
                        }`}
                      ></div>
                      Uppercase letter
                    </div>
                    <div
                      className={getPasswordRequirementClass(
                        /(?=.*\d)/.test(passwordData.newPassword)
                      )}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          /(?=.*\d)/.test(passwordData.newPassword)
                            ? "bg-green-500"
                            : "bg-muted"
                        }`}
                      ></div>
                      Number
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    handlePasswordChange("confirmPassword", e.target.value)
                  }
                  className={getInputClassName(passwordErrors.confirmPassword)}
                  placeholder="Confirm your new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full p-0 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {passwordErrors.confirmPassword && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {passwordErrors.confirmPassword}
                </div>
              )}
            </div>

            <Button onClick={handleSubmitPassword} className="w-full">
              Update Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
