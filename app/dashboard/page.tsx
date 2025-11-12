"use client";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Cookies from "js-cookie";
import { Calendar, FileText } from "lucide-react";
import AreaResponsiveContainer from "@/components/area-responsive-container";
import { ChartSkeleton } from "@/components/ChartSkeleton";
import { getStatusBadgeClass, getStatusIcon } from "@/components/getStatusIcon";
import { NumberTicker } from "@/components/ui/number-ticker";
import { API_URL } from "@/lib/config";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import SkeletonTableRow from "./invitation-code/SkeletonTableRow";
import { StatsCard } from "@/components/stats-card";

export default function DashboardHome() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState({
    totalSubmissions: 0,
    totalRequests: 0,
    totalPayments: 0,
  });

  const getRecentSubmissions = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/export/recent-submissions`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("__ACCESS-TOKEN")}`,
        },
      });

      setSubmissions(data?.data?.submissions);
      setTotalCount({
        totalSubmissions: data?.data?.totalSubmissions,
        totalRequests: data?.data?.totalRequests,
        totalPayments: data?.data?.totalPayments,
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getSubmissions = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/submission/analytics-data`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("__ACCESS-TOKEN")}`,
        },
      });
      console.log(data);
      setData(data?.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getRecentSubmissions();
    getSubmissions();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-accent mb-2">
          Welcome To Dashboard
        </h1>
        <p className="text-muted">
          Manage your contest submissions and account information
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Submissions"
          value={totalCount?.totalSubmissions}
          icon={<FileText className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Total Requests"
          value={totalCount?.totalRequests}
          icon={<FileText className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Total Payments"
          value={totalCount?.totalPayments}
          icon={<FileText className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      {/* Chart Card */}
      <Card>
        <CardHeader>
          <CardTitle>Submissions Overview</CardTitle>
          <CardDescription>Weekly submission trends</CardDescription>
        </CardHeader>
        <CardContent className="pl-0">
          {data.length === 0 && <ChartSkeleton />}

          {data.length > 0 && <AreaResponsiveContainer data={data} />}
        </CardContent>
      </Card>

      {/* Recent Submissions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-yellow-500">Recent Submissions</CardTitle>
          <CardDescription>Your latest script submissions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Script Title</TableHead>
                  <TableHead>Genre</TableHead>
                  <TableHead>Logline</TableHead>
                  <TableHead>Script Length</TableHead>
                  <TableHead>Submitted Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.length === 0 && <SkeletonTableRow round={6} />}
                {submissions.length > 0 &&
                  submissions?.slice(0, 6)?.map((submission) => (
                    <TableRow key={submission._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-yellow-500/70" />
                          <span className="font-medium">
                            {submission.scriptTitle}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{submission.genre}</TableCell>
                      <TableCell>
                        {submission.logline.length > 40
                          ? submission.logline.substring(0, 40) + "..."
                          : submission.logline}
                      </TableCell>
                      <TableCell>{submission.lengthCategory}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          {new Date(submission.createdAt).toLocaleDateString()}
                        </div>
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
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-center">
            <Button
              variant="outline"
              asChild
              disabled={submissions.length === 0}
            >
              <Link href="/dashboard/submissions">View All Submissions</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
