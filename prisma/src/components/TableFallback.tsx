import { TableCell, TableRow } from "./ui/table";


export const TableFallback: React.FC<{ message: string, colSpan: number }> = ({ message, colSpan }) => (
    <TableRow>
        <TableCell colSpan={colSpan} className="text-center">{message}</TableCell>
    </TableRow>
);
