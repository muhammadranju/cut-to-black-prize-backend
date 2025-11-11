"use client";
import {
  getStatusClass,
  getStatusPaymentClass,
} from "@/components/getStatusIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { API_URL } from "@/lib/config";
import axios from "axios";
import { MoreVertical, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import SkeletonTableRow from "./SkeletonTableRow";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface Invitation {
  _id: number;
  fullName: string;
  email: string;
  status: string;
  brief: string;
  interested: string;
  code: string;
  used: boolean;
  paymentVerified: boolean;
}

export default function InvitationCodeTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInvitation, setSelectedInvitation] =
    useState<Invitation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [confirmVerifyDialog, setConfirmVerifyDialog] = useState<{
    open: boolean;
    selectedCode: string | null;
  }>({ open: false, selectedCode: null });
  const itemsPerPage = 10;

  const [invitations, setInvitations] = useState<Invitation[]>([]);

  const filteredInvitations = invitations.filter(
    (invitation) =>
      invitation.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invitation.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredInvitations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInvitations = filteredInvitations.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleView = (invitation: Invitation) => {
    setSelectedInvitation(invitation);
    setIsModalOpen(true);
  };

  const getInvitations = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/invitation`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("__ACCESS-TOKEN")}`,
        },
      });
      setInvitations(data.data);
      // Convert API data to match our interface
      if (data?.data?.invitations) {
        const apiInvitations = data.data.invitations.map((sub: any) => ({
          _id: sub._id,
          fullName: sub.fullName || "Unknown",
          email: sub.email || "",
          status: sub.status || "Available",
          brief: sub.brief || "",
          interested: sub.interested || "",
          code: sub.inviteCode || "",
          paymentVerified: sub.paymentVerified || false,
        }));
        setInvitations(apiInvitations);
        console.log(apiInvitations);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyConfirm = async () => {
    if (!confirmVerifyDialog.selectedCode) return;

    try {
      const { data } = await axios.patch(
        `${API_URL}/invitation`,
        {
          code: confirmVerifyDialog.selectedCode,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("__ACCESS-TOKEN")}`,
          },
        }
      );
      if (data.data.success) {
        toast.success("Payment verified successfully!");
      }
      console.log(data);
      setInvitations((prev) =>
        prev.map((s) =>
          s.code === confirmVerifyDialog.selectedCode
            ? { ...s, paymentVerified: true }
            : s
        )
      );
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setConfirmVerifyDialog({ open: false, selectedCode: null });
    }
  };

  const handleVerify = (code: string) => {
    setConfirmVerifyDialog({ open: true, selectedCode: code });
  };

  useEffect(() => {
    getInvitations();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-accent mb-2">
          Participant Invitation Codes
        </h1>
        <p className="text-muted">Manage invitation codes and user access</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Invitation Codes</CardTitle>
          <CardDescription>
            Manage invitation codes and user access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by email or code..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Brief</TableHead>
                  <TableHead>Interested</TableHead>
                  <TableHead>Code Status</TableHead>
                  <TableHead>Payment Verified</TableHead>
                  <TableHead>Invite Code</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <SkeletonTableRow />
                ) : currentInvitations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No results found for "{searchQuery}".
                    </TableCell>
                  </TableRow>
                ) : (
                  currentInvitations?.map((invitation) => (
                    <TableRow key={invitation._id}>
                      <TableCell className="font-medium">
                        {invitation.fullName}
                      </TableCell>
                      <TableCell>{invitation.email}</TableCell>
                      <TableCell>
                        {invitation.brief.length > 40
                          ? invitation.brief.substring(0, 40) + "..."
                          : invitation.brief}
                      </TableCell>
                      <TableCell>
                        {invitation.interested.length > 40
                          ? invitation.interested.substring(0, 40) + "..."
                          : invitation.interested}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusClass(invitation.used)}>
                          {invitation.used ? "Code Used" : "Available"}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono">
                        <Badge
                          className={getStatusPaymentClass(
                            invitation.paymentVerified
                          )}
                        >
                          {invitation.paymentVerified
                            ? "Verified"
                            : "Unverified"}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono">
                        {invitation.code}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleView(invitation)}
                            >
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              disabled={invitation.paymentVerified}
                              onClick={() => handleVerify(invitation.code)}
                            >
                              Make Payment
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-between">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredInvitations.length)} of{" "}
              {filteredInvitations.length} entries
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={handlePrevPage}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 &&
                      pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          isActive={currentPage === pageNumber}
                          onClick={() => setCurrentPage(pageNumber)}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return null;
                })}
                <PaginationItem>
                  <PaginationNext
                    onClick={handleNextPage}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-screen overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Invitation Details
            </DialogTitle>
            <DialogDescription className="sr-only">
              Details for the selected invitation
            </DialogDescription>
          </DialogHeader>
          {selectedInvitation && (
            <div className="space-y-6 pt-4">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Name
                </h3>
                <p className="text-lg">{selectedInvitation.fullName}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Email
                </h3>
                <p className="text-lg">{selectedInvitation.email}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Brief
                </h3>
                <p className="text-lg">{selectedInvitation.brief}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Interested
                </h3>
                <p className="text-lg">{selectedInvitation.interested}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </h3>
                <Badge className={getStatusClass(selectedInvitation.used)}>
                  {selectedInvitation.used ? "Unavailable" : "Available"}
                </Badge>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Invite Code
                </h3>
                <p className="text-lg font-mono">{selectedInvitation.code}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Payment Verify */}
      <Dialog
        open={confirmVerifyDialog.open}
        onOpenChange={() =>
          setConfirmVerifyDialog({ open: false, selectedCode: null })
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Confirm Payment Verification
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to verify payment for the code{" "}
              <strong>{confirmVerifyDialog.selectedCode}</strong>? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() =>
                setConfirmVerifyDialog({ open: false, selectedCode: null })
              }
            >
              Cancel
            </Button>
            <Button onClick={handleVerifyConfirm}>Confirm</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
