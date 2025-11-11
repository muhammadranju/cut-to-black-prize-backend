import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

const SkeletonTableRow = ({ round = 8 }) =>
  Array.from({ length: round }).map((_, index) => (
    <TableRow key={index}>
      <TableCell>
        <Skeleton className="h-4 w-32 bg-muted-foreground" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-48 bg-muted-foreground" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-64 bg-muted-foreground" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-64 bg-muted-foreground" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-24 bg-muted-foreground" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20 bg-muted-foreground" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20 bg-muted-foreground" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8 w-8 rounded  bg-muted-foreground" />
      </TableCell>
    </TableRow>
  ));

export default SkeletonTableRow;
