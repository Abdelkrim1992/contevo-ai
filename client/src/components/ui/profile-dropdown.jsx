"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateUserProfileMutation } from "@/redux/user/userEndpoint";
import { setUser, setIsAuthenticated, setToken } from "@/redux/auth/authSlice";
import { useLogoutMutation } from "@/redux/auth/authEndpoint";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  CreditCard,
  Lock,
  LogOut,
  Mail,
  User,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ProfileDropdown = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateUserProfileMutation();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(setUser(null));
      dispatch(setIsAuthenticated(false));
      dispatch(setToken(null));
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const res = await updateProfile(formData).unwrap();
      if (res && res.user) {
        dispatch(setUser({ ...user, ...res.user }));
        setIsProfileModalOpen(false);
      } else {
        // Fallback in case backend doesn't return user
        dispatch(setUser({ ...user, ...formData }));
        setIsProfileModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer mt-auto">
          <Button className="gap-2" variant="outline">
            <Avatar className="h-6 w-6">
              <AvatarImage
                alt="User Avatar"
                src={user?.imageUrl || "https://github.com/haydenbleasel.png"}
              />
              <AvatarFallback>{user?.fullName?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <span>{user?.fullName || "User"}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel className="font-normal">
            <div className="flex items-center gap-3 pb-2">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  alt="User Avatar"
                  src={user?.imageUrl || "https://github.com/haydenbleasel.png"}
                />
                <AvatarFallback>{user?.fullName?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-1">
                <p className="font-medium text-sm leading-none">{user?.fullName || "User"}</p>
                <p className="text-muted-foreground text-xs leading-none">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setIsProfileModalOpen(true)}>
              <User />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail />
              Email Preferences
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Lock />
              Privacy & Security
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Billing</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <CreditCard />
              Payment Methods
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Users />
              Team Subscription
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={handleLogout} className="cursor-pointer">
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile details below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDropdown;
