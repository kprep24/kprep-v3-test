"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import useAuthStore from '@/store/AuthStore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import UserTable, { IUserList } from './UserTable';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FileSpreadsheet, Filter } from "lucide-react";
import { useGetUsers } from '../../api/users/useGetUsers';
import WindowSelect from './windowSelection';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import PaginationController from '@/components/pagination/PaginationController';

function User() {
  const [page, setPage] = useState<number>(1);
  const [rollNo, setRollNo] = useState<string | null>(null);
  const [windowSize, setWindowSize] = useState<number>(10);
  const { role } = useAuthStore();
  const users: any = useGetUsers(page, rollNo, windowSize);

  const userList: IUserList[] = rollNo && rollNo?.length >= 5 ? users?.data?.user || [] : users?.data?.users || [];
  const totalPages = users.data?.totalPages || 1;

  const router = useRouter();

  useEffect(() => {
    if (role === "Admin") {
      router.push('/dashboard');
    }
  }, [role, router]);

  const handleExport = () => {
    if (!userList.length) return;
    const preparedData = prepareDataForExcel(userList);
    const workbook = createExcelWorkbook(preparedData);
    downloadExcel(workbook, 'users_data.xlsx');
  };

  function prepareDataForExcel(data: IUserList[]): any[][] {
    if (!data.length) return [];
    const headers = Object.keys(data[0]) as (keyof IUserList)[];
    const rows = data.map((item) => headers.map((header) => item[header] ?? ""));
    return [headers, ...rows];
  }

  function createExcelWorkbook(data: any[][]) {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    return workbook;
  }

  function downloadExcel(workbook: XLSX.WorkBook, fileName: string) {
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
  }


  // const { role } = useAuthStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>
          View and manage all registered users in the system. Click on a user to access detailed information and perform administrative actions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex my-4 justify-between">
          <div className="w-6/12">
            <Input
              value={rollNo ?? ""}
              onChange={(e) => setRollNo(e.target.value)}
              type="number"
              placeholder="Roll No"
            />
          </div>
          <div className="flex gap-2">
            <WindowSelect setWindowSize={setWindowSize} windowSize={windowSize} />
            {role === "SuperAdmin" && <Button onClick={handleExport} className="gap-2">
              <FileSpreadsheet className="w-5 h-5" />
              Export to Excel
            </Button>}
            <Button className="gap-2">
              <Filter className="w-5 h-5" />
              Filter
            </Button>
          </div>
        </div>
        <Card>
          <UserTable
            userList={userList}
            totalPages={totalPages}
            page={page}
            users={users}
            setPage={setPage}
          />
        </Card>
      </CardContent>
      <CardFooter className='flex justify-center'>
        <PaginationController
          initialPage={page}
          totalPages={totalPages}
          onPageChange={setPage} />
      </CardFooter>
    </Card>
  );
}

export default User;