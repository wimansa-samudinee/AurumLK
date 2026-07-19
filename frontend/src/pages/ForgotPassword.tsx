import { Link, useSearchParams } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle, Lock, Loader2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import * as api from "../lib/api";

export default function ForgotPassword() {
  const [searchParams] = useSearchParams();
  const tokenParam = searchParams.get("token");
  const emailParam = searchParams.get("email");

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [resetLink, setResetLink] = useState("");
  const [testEmailUrl, setTestEmailUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Reset password states
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetDone, setResetDone] = useState(false);

  // Token verification states
  const [verifyingToken, setVerifyingToken] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [emailParam]);

  useEffect(() => {
    if (!tokenParam) {
      setSubmitted(false);
      setResetDone(false);
      setTokenValid(null);
      setError("");
    }
  }, [tokenParam]);

  useEffect(() => {
    if (tokenParam && emailParam) {
      const verifyToken = async () => {
        setVerifyingToken(true);
        setError("");
        try {
          const res = await api.verifyResetToken({
            email: emailParam,
            token: tokenParam,
          });
          if (res.valid) {
            setTokenValid(true);
          } else {
            setTokenValid(false);
            setError("Invalid or expired reset token.");
          }
        } catch (err) {
          setTokenValid(false);
          setError(err instanceof Error ? err.message : "Invalid or expired reset token.");
        } finally {
          setVerifyingToken(false);
        }
      };
      verifyToken();
    }
  }, [tokenParam, emailParam]);

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.forgotPassword(email);
      setResetLink(res.resetLink);
      if (res.testPreviewUrl) {
        setTestEmailUrl(res.testPreviewUrl);
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate reset link.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await api.resetPassword({
        email: emailParam,
        token: tokenParam,
        newPassword
      });
      setResetDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">A</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">AurumLK</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
          <p className="text-gray-600">
            {tokenParam
              ? "Enter your new password below"
              : submitted
              ? "Check your email for reset instructions"
              : "Enter your email to receive a reset link"}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg border p-8">
          {tokenParam ? (
            /* Reset Password Form */
            resetDone ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Password Reset!</h3>
                <p className="text-gray-600 mb-6">
                  Your password has been updated successfully. You can now log in with your new credentials.
                </p>
                <Link
                  to="/login"
                  className="w-full block text-center px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold"
                >
                  Go to Login
                </Link>
              </div>
            ) : verifyingToken ? (
              <div className="text-center py-8">
                <Loader2 className="w-10 h-10 text-amber-500 animate-spin mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Verifying reset link...</p>
              </div>
            ) : tokenValid === false ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-10 h-10 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Invalid Reset Link</h3>
                <p className="text-gray-600 mb-6 text-sm">
                  {error || "This password reset link is invalid or has expired. Please request a new one."}
                </p>
                <Link
                  to="/forgot-password"
                  onClick={() => {
                    window.location.href = window.location.origin + "/forgot-password";
                  }}
                  className="w-full block text-center px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold"
                >
                  Request New Link
                </Link>
              </div>
            ) : (
              <form onSubmit={handleResetSubmit} className="space-y-6">
                <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                  <p className="text-xs text-amber-800">
                    Resetting password for: <strong className="font-semibold">{emailParam}</strong>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                </div>

                {error && <p className="text-sm text-red-600 font-semibold">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold disabled:opacity-60 cursor-pointer"
                >
                  {loading ? "Updating..." : "Save Password"}
                </button>
              </form>
            )
          ) : /* Forgot Password Form */
          !submitted ? (
            <form onSubmit={handleForgotSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              {error && <p className="text-sm text-red-600 font-semibold">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold disabled:opacity-60 cursor-pointer"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Sent!</h3>
              <p className="text-gray-600 mb-6 text-sm">
                We have sent password reset instructions to <strong>{email}</strong>.
              </p>
              
              {testEmailUrl ? (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-left">
                  <p className="text-xs text-amber-800 font-medium mb-3">
                    <strong>Local Dev Testing:</strong> Since this is running locally, we sent the email to a test Ethereal Mail inbox. Click below to view the email and click the reset link:
                  </p>
                  <a
                    href={testEmailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-semibold mb-2"
                  >
                    Open Test Email Inbox
                  </a>
                  <p className="text-[10px] text-gray-400 text-center">
                    You can also copy/paste the link from the backend console.
                  </p>
                </div>
              ) : (
                <p className="text-xs text-gray-500 text-center">
                  Please click the link inside the email to set your new password.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link to="/login" className="inline-flex items-center space-x-2 text-amber-600 hover:text-amber-700 font-semibold">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
