import React, { useState, useRef } from "react";
import { Edit2, Mail, Phone, User, Save, X, Camera, Upload } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
const ProfilePage = ({data}) => {
  const designation = sessionStorage.getItem("designation");
  const username = sessionStorage.getItem("username");
  const department = sessionStorage.getItem("department");
  const empid = sessionStorage.getItem("empid");
  const email = sessionStorage.getItem("email");
  const phone = sessionStorage.getItem("phone");
  const dob = sessionStorage.getItem("dob");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: username || "User",
    role: designation || "Faculty",
    department: department || "CSE",
    staffId: empid || "BEC210",
    phone: phone || "812828803",
    email: email || "abc@gamil.com",
    gender: "Male",
    identifyCode: empid || "123456789",
    nationality: "India",
    language : "English , Hindi",
    dateOfBirth:  dob || "2005-11-19T00:00:00.000Z",
    hometown: "Ahmedabad",
    religion: "None", 
    maritalStatus: "Single",
    permanentAddress: "5. Nguyen Chi Thanh Street, Tan Binh Ward, Hai Duong",
    currentAddress: "29. Nguyen Ngoc Doan Street, Dong Da District, Ha Noi",
    education: [
      {
        degree: "Bachelor in Management Information System",
        institution: "National Economic University",
        period: "2014-2018"
      }
    ],
    university: {
      _id: "68c14c44986cc6876d4444b3",
      name: "Nirma University",
      address: "Ahmedabad, Gujarat, India"
    }
  });

  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEducationChange = (index, field, value) => {
    setProfileData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const handleUniversityChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      university: {
        ...prev.university,
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    console.log("Saving profile data:", profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-6">
      {/* Profile Header - Mobile Responsive */}
      <Card className="overflow-hidden">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
            {/* Profile Picture Section */}
<div className="flex flex-col items-center md:items-start w-full md:w-auto">
  <div className="relative group">
    <Avatar className="w-16 h-16 md:w-20 md:h-20 border-4 border-primary/20">
      <AvatarImage 
        src={profileImage || "/api/placeholder/80/80"} 
        alt={profileData.name} 
      />
      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-lg md:text-xl">
        {profileData.name.split(" ").map(n => n[0]).join("")}
      </AvatarFallback>
    </Avatar>

    {/* Always show camera button on hover */}
    <button
      type="button"
      onClick={() => fileInputRef.current?.click()}
      className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md 
                 opacity-0 group-hover:opacity-100 transition"
    >
      <Camera className="w-4 h-4 text-gray-700" />
    </button>
  </div>

  {/* Keep mobile button too (optional) */}
  <Button
    variant="outline"
    size="sm"
    onClick={() => fileInputRef.current?.click()}
    className="mt-2 md:hidden flex items-center space-x-2"
  >
    <Upload className="h-3 w-3" />
    <span className="text-xs">Change Photo</span>
  </Button>
</div>

            {/* Profile Info Section */}
            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between space-y-4 md:space-y-0">
                <div className="flex-1">
                  <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2">{profileData.name}</h1>
                  <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 text-muted-foreground mb-4">
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {profileData.role}
                    </span>
                    <span className="hidden md:inline text-muted-foreground">|</span>
                    <span>{profileData.department}</span>
                  </div>
                </div>
                
                {/* Edit Buttons */}
                <div className="flex items-center space-x-2">
                  {isEditing ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                        className="flex items-center space-x-1 md:space-x-2"
                      >
                        <X className="h-3 w-3 md:h-4 md:w-4" />
                        <span className="text-xs md:text-sm">Cancel</span>
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSave}
                        className="flex items-center space-x-1 md:space-x-2"
                      >
                        <Save className="h-3 w-3 md:h-4 md:w-4" />
                        <span className="text-xs md:text-sm">Save</span>
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-1 md:space-x-2"
                    >
                      <Edit2 className="h-3 w-3 md:h-4 md:w-4" />
                      <span className="text-xs md:text-sm">Edit</span>
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Contact Info - Mobile Responsive */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <User className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                    <span className="text-xs md:text-sm font-medium">Staff ID:</span>
                    <span className="text-xs md:text-sm">{profileData.staffId}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                    <span className="text-xs md:text-sm font-medium">Phone:</span>
                    {isEditing ? (
                      <Input
                        value={profileData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="h-6 md:h-8 text-xs md:text-sm flex-1"
                        placeholder="Enter phone number"
                      />
                    ) : (
                      <span className="text-xs md:text-sm">{profileData.phone}</span>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                    <span className="text-xs md:text-sm font-medium">Email:</span>
                    <span className="text-xs md:text-sm">{profileData.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Cards - Mobile Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Personal Information Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 md:pb-4">
            <CardTitle className="text-base md:text-lg font-semibold">Personal information</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
              <Edit2 className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-1 md:space-y-2">
                <Label className="text-xs md:text-sm font-medium">Gender</Label>
                {isEditing ? (
                  <Select value={profileData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger className="h-7 md:h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-xs md:text-sm text-muted-foreground">{profileData.gender}</p>
                )}
              </div>
              <div className="space-y-1 md:space-y-2">
                <Label className="text-xs md:text-sm font-medium">Identify code</Label>
                {isEditing ? (
                  <Input
                    value={profileData.identifyCode}
                    onChange={(e) => handleInputChange("identifyCode", e.target.value)}
                    className="h-7 md:h-8 text-xs md:text-sm"
                  />
                ) : (
                  <p className="text-xs md:text-sm text-muted-foreground">{profileData.identifyCode}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-1 md:space-y-2">
                <Label className="text-xs md:text-sm font-medium">Nationality</Label>
                {isEditing ? (
                  <Input
                    value={profileData.nationality}
                    onChange={(e) => handleInputChange("nationality", e.target.value)}
                    className="h-7 md:h-8 text-xs md:text-sm"
                  />
                ) : (
                  <p className="text-xs md:text-sm text-muted-foreground">{profileData.nationality}</p>
                )}
              </div>
              <div className="space-y-1 md:space-y-2">
                <Label className="text-xs md:text-sm font-medium">Language</Label>
                {isEditing ? (
                  <Input
                    value={profileData.language}
                    onChange={(e) => handleInputChange("language", e.target.value)}
                    className="h-7 md:h-8 text-xs md:text-sm"
                  />
                ) : (
                  <p className="text-xs md:text-sm text-muted-foreground">{profileData.language}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-1 md:space-y-2">
                <Label className="text-xs md:text-sm font-medium">Date of birth</Label>
                {isEditing ? (
                  <Input
                    type="date"
                    value={profileData.dateOfBirth.split('T')[0]}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value + "T00:00:00.000Z")}
                    className="h-7 md:h-8 text-xs md:text-sm"
                  />
                ) : (
                  <p className="text-xs md:text-sm text-muted-foreground">{formatDate(profileData.dateOfBirth)}</p>
                )}
              </div>
              <div className="space-y-1 md:space-y-2">
                <Label className="text-xs md:text-sm font-medium">Hometown</Label>
                {isEditing ? (
                  <Input
                    value={profileData.hometown}
                    onChange={(e) => handleInputChange("hometown", e.target.value)}
                    className="h-7 md:h-8 text-xs md:text-sm"
                  />
                ) : (
                  <p className="text-xs md:text-sm text-muted-foreground">{profileData.hometown}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-1 md:space-y-2">
                <Label className="text-xs md:text-sm font-medium">Religion</Label>
                {isEditing ? (
                  <Input
                    value={profileData.religion}
                    onChange={(e) => handleInputChange("religion", e.target.value)}
                    className="h-7 md:h-8 text-xs md:text-sm"
                  />
                ) : (
                  <p className="text-xs md:text-sm text-muted-foreground">{profileData.religion}</p>
                )}
              </div>
              <div className="space-y-1 md:space-y-2">
                <Label className="text-xs md:text-sm font-medium">Marital status</Label>
                {isEditing ? (
                  <Select value={profileData.maritalStatus} onValueChange={(value) => handleInputChange("maritalStatus", value)}>
                    <SelectTrigger className="h-7 md:h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single">Single</SelectItem>
                      <SelectItem value="Married">Married</SelectItem>
                      <SelectItem value="Divorced">Divorced</SelectItem>
                      <SelectItem value="Widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-xs md:text-sm text-muted-foreground">{profileData.maritalStatus}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-1 md:space-y-2">
              <Label className="text-xs md:text-sm font-medium">Permanent address</Label>
              {isEditing ? (
                <Input
                  value={profileData.permanentAddress}
                  onChange={(e) => handleInputChange("permanentAddress", e.target.value)}
                  className="h-7 md:h-8 text-xs md:text-sm"
                />
              ) : (
                <p className="text-xs md:text-sm text-muted-foreground">{profileData.permanentAddress}</p>
              )}
            </div>
            
            <div className="space-y-1 md:space-y-2">
              <Label className="text-xs md:text-sm font-medium">Current address</Label>
              {isEditing ? (
                <Input
                  value={profileData.currentAddress}
                  onChange={(e) => handleInputChange("currentAddress", e.target.value)}
                  className="h-7 md:h-8 text-xs md:text-sm"
                />
              ) : (
                <p className="text-xs md:text-sm text-muted-foreground">{profileData.currentAddress}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="space-y-4 md:space-y-6">
          {/* Education Information Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 md:pb-4">
              <CardTitle className="text-base md:text-lg font-semibold">Education information</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
                <Edit2 className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              {profileData.education.map((edu, index) => (
                <div key={index} className="space-y-2">
                  <div className="space-y-1">
                    <Label className="text-xs md:text-sm font-medium">Degree</Label>
                    {isEditing ? (
                      <Input
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                        className="h-7 md:h-8 text-xs md:text-sm"
                      />
                    ) : (
                      <p className="text-xs md:text-sm text-muted-foreground">{edu.degree}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs md:text-sm font-medium">Institution</Label>
                    {isEditing ? (
                      <Input
                        value={edu.institution}
                        onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                        className="h-7 md:h-8 text-xs md:text-sm"
                      />
                    ) : (
                      <p className="text-xs md:text-sm text-muted-foreground">{edu.institution}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs md:text-sm font-medium">Period</Label>
                    {isEditing ? (
                      <Input
                        value={edu.period}
                        onChange={(e) => handleEducationChange(index, "period", e.target.value)}
                        className="h-7 md:h-8 text-xs md:text-sm"
                      />
                    ) : (
                      <p className="text-xs md:text-sm text-muted-foreground">{edu.period}</p>
                    )}
                  </div>
                  {index < profileData.education.length - 1 && <hr className="my-3 md:my-4" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* University Information Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 md:pb-4">
              <CardTitle className="text-base md:text-lg font-semibold">University information</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
                <Edit2 className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              <div className="space-y-1 md:space-y-2">
                <Label className="text-xs md:text-sm font-medium">University Name</Label>
                {isEditing ? (
                  <Input
                    value={profileData.university.name}
                    onChange={(e) => handleUniversityChange("name", e.target.value)}
                    className="h-7 md:h-8 text-xs md:text-sm"
                  />
                ) : (
                  <p className="text-xs md:text-sm text-muted-foreground">{profileData.university.name}</p>
                )}
              </div>
              
              <div className="space-y-1 md:space-y-2">
                <Label className="text-xs md:text-sm font-medium">University Address</Label>
                {isEditing ? (
                  <Input
                    value={profileData.university.address}
                    onChange={(e) => handleUniversityChange("address", e.target.value)}
                    className="h-7 md:h-8 text-xs md:text-sm"
                  />
                ) : (
                  <p className="text-xs md:text-sm text-muted-foreground">{profileData.university.address}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Hidden file input for image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};

export default ProfilePage;
