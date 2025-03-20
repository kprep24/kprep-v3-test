import { TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface ITableHeader {
    LIST: string[];
}

const TableHeaderView: React.FC<ITableHeader> = ({ LIST }: ITableHeader) => {
    return (
        <TableHeader>
                <TableRow>
            
                    {LIST && LIST.map((header, index) => (
                        <TableHead key={index}>{header}</TableHead>
                    ))}
     
                </TableRow>
        </TableHeader>
    )
}

export default TableHeaderView;