"use client";
import { getStatusBadgeClass, getStatusIcon } from "@/components/getStatusIcon";
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
import { Input } from "@/components/ui/input";
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
import {
  Award,
  CheckCircle,
  Clock,
  Download,
  Loader2,
  MoreVertical,
  Search,
  X,
  Eye,
} from "lucide-react";
import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { toast } from "sonner";
import SkeletonTableRowSubmission from "./SkeletonTableRowSubmission";

interface MockSubmission {
  id: string;
  fullName: string;
  email: string;
  scriptTitle: string;
  logline: string;
  genre: string;
  scriptLength: string;
  pdf: string;
  status: string;
}

export default function SubmissionsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [submissions, setSubmissions] = useState<MockSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    submissionId: string | null;
    newStatus: string;
  }>({ open: false, submissionId: null, newStatus: "" });
  const [viewModal, setViewModal] = useState<{
    open: boolean;
    selectedSubmission: MockSubmission | null;
  }>({ open: false, selectedSubmission: null });
  const itemsPerPage = 8;

  const handleStatusChange = async (
    submissionId: string,
    newStatus: string
  ) => {
    try {
      const { data } = await axios.patch(
        `${API_URL}/submission/${submissionId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("__ACCESS-TOKEN")}`,
          },
        }
      );
      console.log(data);
      setConfirmDialog({ open: false, submissionId: null, newStatus: "" });
      setSubmissions((prev) =>
        prev.map((s) =>
          s.id === submissionId ? { ...s, status: newStatus } : s
        )
      );
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const filteredSubmissions = submissions.filter(
    (submission) =>
      submission.fullName?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
      submission.email?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
      submission.scriptTitle
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      submission.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSubmissions = filteredSubmissions.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleStatusSelect = (submissionId: string, newStatus: string) => {
    setConfirmDialog({ open: true, submissionId, newStatus });
  };

  const handleView = (submission: MockSubmission) => {
    setViewModal({ open: true, selectedSubmission: submission });
  };

  const closeViewModal = () => {
    setViewModal({ open: false, selectedSubmission: null });
  };

  const submissionForConfirm = submissions.find(
    (s) => s.id === confirmDialog.submissionId
  );

  const getRecentSubmissions = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/submission`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("__ACCESS-TOKEN")}`,
        },
      });
      if (data.data.success) {
        toast.success("Submissions updated successfully!");
      }
      if (data?.data?.submissions) {
        const apiSubmissions = data.data.submissions.map((sub: any) => ({
          id: sub._id,
          fullName: sub.fullName || "Unknown",
          email: sub.email || "",
          scriptTitle: sub.scriptTitle || "",
          logline: sub.logline || "",
          genre: sub.genre || "",
          scriptLength: sub.lengthCategory || "",
          pdf: sub.pdfDownload || "",
          status: sub.status || "Received",
        }));
        setSubmissions(apiSubmissions);
      }

      // Convert API data to match our interface
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handelDownloadCSV = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${API_URL}/export/csv`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("__ACCESS-TOKEN")}`,
        },
      });
      if (data.data.success) {
        setIsLoading(false);
        toast.success("CSV file downloaded successfully!");
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handelDownloadExcel = async () => {
    try {
      setIsLoading2(true);
      const { data } = await axios.get(`${API_URL}/export/excel`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("__ACCESS-TOKEN")}`,
        },
      });
      if (data.data.success) {
        setIsLoading2(false);
        toast.success("Excel file downloaded successfully!");
      }
    } catch (error: any) {
      setIsLoading2(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getRecentSubmissions();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-accent mb-2">
          Participant Submissions Data
        </h1>
        <p className="text-muted">
          View and manage all submissions made by users.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Submissions Table</CardTitle>
          <CardDescription>
            View and manage all submissions made by users.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Export */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search submissions..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => handelDownloadCSV()}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                CSV
              </Button>
              <Button
                className="bg-green-500 hover:bg-green-600"
                onClick={() => handelDownloadExcel()}
                disabled={isLoading2}
              >
                {isLoading2 ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                EXCEL
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Script Title</TableHead>
                  <TableHead>Logline</TableHead>
                  <TableHead>Genre</TableHead>
                  <TableHead>Script Length</TableHead>
                  <TableHead>PDF</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentSubmissions.length === 0 && (
                  <SkeletonTableRowSubmission />
                )}
                {currentSubmissions.length > 0 &&
                  currentSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">
                        {submission?.fullName}
                      </TableCell>
                      <TableCell>{submission.email}</TableCell>
                      <TableCell>{submission.scriptTitle}</TableCell>
                      <TableCell className="max-w-xs">
                        {submission.logline?.length > 40
                          ? submission.logline?.substring(0, 40) + "..."
                          : submission.logline}
                      </TableCell>
                      <TableCell>{submission.genre}</TableCell>
                      <TableCell>{submission.scriptLength}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={submission.pdf}
                            download
                            className="flex items-center gap-1"
                          >
                            <Download className="w-3 h-3" />
                            PDF
                          </a>
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${getStatusBadgeClass(
                            submission.status
                          )} inline-flex items-center gap-1`}
                        >
                          {getStatusIcon(submission.status)}
                          {submission.status}
                        </Badge>
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
                              onClick={() => handleView(submission)}
                              className="flex items-center gap-2"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusSelect(submission.id, "Received")
                              }
                              className="flex items-center gap-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Received
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusSelect(submission.id, "In Review")
                              }
                              className="flex items-center gap-2"
                            >
                              <Clock className="w-4 h-4" />
                              In Review
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusSelect(submission.id, "Judged")
                              }
                              className="flex items-center gap-2"
                            >
                              <Award className="w-4 h-4" />
                              Judged
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredSubmissions.length)} of{" "}
              {filteredSubmissions.length} entries
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={handlePrevPage}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50 cursor-not-allowed"
                        : ""
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
                      <PaginationItem key={`ellipsis-${pageNumber}`}>
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
                        ? "pointer-events-none opacity-50 cursor-not-allowed"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onOpenChange={() =>
          setConfirmDialog({ open: false, submissionId: null, newStatus: "" })
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Confirm Status Change
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to change the status to{" "}
              <span className="font-semibold">{confirmDialog.newStatus}</span>{" "}
              for{" "}
              <span className="font-semibold">
                {submissionForConfirm?.fullName} (
                {submissionForConfirm?.scriptTitle})
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() =>
                setConfirmDialog({
                  open: false,
                  submissionId: null,
                  newStatus: "",
                })
              }
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                confirmDialog.submissionId &&
                handleStatusChange(
                  confirmDialog.submissionId,
                  confirmDialog.newStatus
                )
              }
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      <Dialog open={viewModal.open} onOpenChange={() => closeViewModal()}>
        <DialogContent className="max-w-4xl max-h-screen overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Submission Details
            </DialogTitle>
            <DialogDescription className="sr-only">
              Details for the selected submission
            </DialogDescription>
          </DialogHeader>
          {viewModal.selectedSubmission && (
            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div className="space-y-2"></div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Full Name
                  </h3>
                  <p className="text-lg">
                    {viewModal.selectedSubmission.fullName}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Email
                  </h3>
                  <p className="text-lg">
                    {viewModal.selectedSubmission.email}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Script Title
                  </h3>
                  <p className="text-lg">
                    {viewModal.selectedSubmission.scriptTitle}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Genre
                  </h3>
                  <p className="text-lg">
                    {viewModal.selectedSubmission.genre}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Script Length
                  </h3>
                  <p className="text-lg">
                    {viewModal.selectedSubmission.scriptLength}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </h3>
                  <Badge
                    className={`${getStatusBadgeClass(
                      viewModal.selectedSubmission.status
                    )} inline-flex items-center gap-1`}
                  >
                    {getStatusIcon(viewModal.selectedSubmission.status)}
                    {viewModal.selectedSubmission.status}
                  </Badge>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Logline
                </h3>
                <p className="text-lg">
                  {viewModal.selectedSubmission.logline}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
