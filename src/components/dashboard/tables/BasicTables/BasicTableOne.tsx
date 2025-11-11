import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/redux";
import { fetchUsers } from "../../../../redux/actions/userAction";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Badge from "../../ui/badge/Badge";

export default function UsersTable() {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.user);

  // Load users on mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Base URL for assets (e.g. http://localhost:5500)
  const ASSET_URL = import.meta.env.VITE_ASSET_URL || "";

  // Helper to resolve photo path
  const getPhotoUrl = (photo?: string) => {
    if (!photo) return "/images/user.png"; // fallback
    return photo.startsWith("http")
      ? photo
      : `${ASSET_URL}${photo}`; // prepend backend asset URL
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Photo
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Name
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Email
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Role
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Agency
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Phone
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                ID
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {loading ? (
              <TableRow>
                <td colSpan={7} className="py-5 text-center text-gray-500 dark:text-gray-400">
                  Loading users...
                </td>
              </TableRow>
            ) : error ? (
              <TableRow>
                <td colSpan={7} className="py-5 text-center text-red-500 dark:text-red-400">
                  {error}
                </td>
              </TableRow>
            ) : users?.length === 0 ? (
              <TableRow>
                <td colSpan={7} className="py-5 text-center text-gray-500 dark:text-gray-400">
                  No users found
                </td>
              </TableRow>
            ) : (
              users?.map((user) => {
                const photoUrl = getPhotoUrl(user.photo);

                return (
                  <TableRow key={user._id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                          src={photoUrl}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-800 font-medium text-theme-sm dark:text-white/90">
                      {user.name || "N/A"}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {user.email || "N/A"}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={
                          user.role === "superadmin"
                            ? "success"
                            : user.role === "admin"
                            ? "warning"
                            : "error"
                        }
                      >
                        {user.role || "N/A"}
                      </Badge>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {user.agency || "-"}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {user.phone || "-"}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-400 text-theme-xs dark:text-gray-500">
                      {user._id}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
