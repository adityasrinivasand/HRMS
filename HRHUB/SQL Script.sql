USE [master]
GO
/****** Object:  Database [HR]    Script Date: 08-11-2019 20:05:55 ******/
CREATE DATABASE [HR]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'HR', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\HR.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'HR_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\HR_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [HR] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [HR].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [HR] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [HR] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [HR] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [HR] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [HR] SET ARITHABORT OFF 
GO
ALTER DATABASE [HR] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [HR] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [HR] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [HR] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [HR] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [HR] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [HR] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [HR] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [HR] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [HR] SET  DISABLE_BROKER 
GO
ALTER DATABASE [HR] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [HR] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [HR] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [HR] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [HR] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [HR] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [HR] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [HR] SET RECOVERY FULL 
GO
ALTER DATABASE [HR] SET  MULTI_USER 
GO
ALTER DATABASE [HR] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [HR] SET DB_CHAINING OFF 
GO
ALTER DATABASE [HR] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [HR] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [HR] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'HR', N'ON'
GO
ALTER DATABASE [HR] SET QUERY_STORE = OFF
GO
USE [HR]
GO
/****** Object:  Table [dbo].[Attendance]    Script Date: 08-11-2019 20:05:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Attendance](
	[ID] [int] NOT NULL,
	[Date] [date] NOT NULL,
	[CheckIn] [time](7) NOT NULL,
	[CheckOut] [time](7) NOT NULL,
	[Status] [nvarchar](max) NOT NULL,
	[Employee_ID] [int] NOT NULL,
 CONSTRAINT [Attendance_pk] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Designation]    Script Date: 08-11-2019 20:05:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Designation](
	[ID] [int] NOT NULL,
	[Type] [nvarchar](max) NOT NULL,
 CONSTRAINT [Designation_pk] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Designation_History]    Script Date: 08-11-2019 20:05:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Designation_History](
	[ID] [int] NOT NULL,
	[Designation_ID] [int] NOT NULL,
	[Employee_ID] [int] NOT NULL,
	[Date] [date] NOT NULL,
 CONSTRAINT [Designation_History_pk] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employee]    Script Date: 08-11-2019 20:05:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employee](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[DOB] [date] NOT NULL,
	[UserName] [nvarchar](max) NOT NULL,
	[DOJ] [date] NOT NULL,
	[PhoneNumber] [bigint] NOT NULL,
	[Email_ID] [nvarchar](max) NOT NULL,
	[BloodType] [nvarchar](max) NOT NULL,
	[MaritalStatus] [nvarchar](max) NOT NULL,
	[Nationality] [nvarchar](max) NOT NULL,
	[Gender] [nvarchar](max) NOT NULL,
	[Department] [nvarchar](max) NOT NULL,
	[IsEmailVerified] [bit] NULL,
	[VerificationCode] [uniqueidentifier] NULL,
 CONSTRAINT [Employee_pk] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Leave]    Script Date: 08-11-2019 20:05:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Leave](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Submit_Date] [date] NOT NULL,
	[Response_Date] [date] NULL,
	[Leave_StartDate] [date] NOT NULL,
	[Leave_EndDate] [date] NOT NULL,
	[Reason] [nvarchar](max) NOT NULL,
	[Status] [nvarchar](max) NULL,
	[Leave_Type_ID] [int] NOT NULL,
	[Employee_ID] [int] NOT NULL,
	[From_Session] [int] NOT NULL,
	[To_Session] [int] NOT NULL,
	[Apply_To] [nvarchar](max) NOT NULL,
 CONSTRAINT [Leave_pk] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Leave_Tracking]    Script Date: 08-11-2019 20:05:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Leave_Tracking](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Employee_ID] [int] NOT NULL,
	[Leave_Type_ID] [int] NOT NULL,
	[RemainingDays] [float] NOT NULL,
 CONSTRAINT [Leave_Tracking_pk] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Leave_Type]    Script Date: 08-11-2019 20:05:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Leave_Type](
	[ID] [int] NOT NULL,
	[LeaveType] [nvarchar](max) NOT NULL,
	[MaxLeave] [int] NOT NULL,
 CONSTRAINT [Leave_Type_pk] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserInfo]    Script Date: 08-11-2019 20:05:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserInfo](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[Employee_ID] [int] NOT NULL,
	[UserName] [nvarchar](max) NOT NULL,
	[Password] [nvarchar](max) NOT NULL,
	[ResetCode] [nvarchar](max) NULL,
	[Token] [nvarchar](max) NULL,
	[isAdmin] [bit] NULL,
	[Captcha] [nvarchar](max) NULL,
 CONSTRAINT [UserInfo_pk] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[Attendance]  WITH CHECK ADD  CONSTRAINT [Attendance_Employee] FOREIGN KEY([Employee_ID])
REFERENCES [dbo].[Employee] ([ID])
GO
ALTER TABLE [dbo].[Attendance] CHECK CONSTRAINT [Attendance_Employee]
GO
ALTER TABLE [dbo].[Designation_History]  WITH CHECK ADD  CONSTRAINT [Employee_Designation_Designation] FOREIGN KEY([Designation_ID])
REFERENCES [dbo].[Designation] ([ID])
GO
ALTER TABLE [dbo].[Designation_History] CHECK CONSTRAINT [Employee_Designation_Designation]
GO
ALTER TABLE [dbo].[Designation_History]  WITH CHECK ADD  CONSTRAINT [Employee_Designation_Employee] FOREIGN KEY([Employee_ID])
REFERENCES [dbo].[Employee] ([ID])
GO
ALTER TABLE [dbo].[Designation_History] CHECK CONSTRAINT [Employee_Designation_Employee]
GO
ALTER TABLE [dbo].[Leave]  WITH CHECK ADD  CONSTRAINT [Leave_Employee] FOREIGN KEY([Employee_ID])
REFERENCES [dbo].[Employee] ([ID])
GO
ALTER TABLE [dbo].[Leave] CHECK CONSTRAINT [Leave_Employee]
GO
ALTER TABLE [dbo].[Leave]  WITH CHECK ADD  CONSTRAINT [Leave_Leave_Type] FOREIGN KEY([Leave_Type_ID])
REFERENCES [dbo].[Leave_Type] ([ID])
GO
ALTER TABLE [dbo].[Leave] CHECK CONSTRAINT [Leave_Leave_Type]
GO
ALTER TABLE [dbo].[Leave_Tracking]  WITH CHECK ADD  CONSTRAINT [Leave_Tracking_Employee] FOREIGN KEY([Employee_ID])
REFERENCES [dbo].[Employee] ([ID])
GO
ALTER TABLE [dbo].[Leave_Tracking] CHECK CONSTRAINT [Leave_Tracking_Employee]
GO
ALTER TABLE [dbo].[Leave_Tracking]  WITH CHECK ADD  CONSTRAINT [Leave_Tracking_Leave_Type] FOREIGN KEY([Leave_Type_ID])
REFERENCES [dbo].[Leave_Type] ([ID])
GO
ALTER TABLE [dbo].[Leave_Tracking] CHECK CONSTRAINT [Leave_Tracking_Leave_Type]
GO
ALTER TABLE [dbo].[UserInfo]  WITH CHECK ADD  CONSTRAINT [UserInfo_Employee] FOREIGN KEY([Employee_ID])
REFERENCES [dbo].[Employee] ([ID])
GO
ALTER TABLE [dbo].[UserInfo] CHECK CONSTRAINT [UserInfo_Employee]
GO
/****** Object:  StoredProcedure [dbo].[AddUserInfo]    Script Date: 08-11-2019 20:05:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddUserInfo] @empid bigint, @empUserName nvarchar(max), @emppass nvarchar(max)
AS
Insert into UserInfo(Employee_ID,UserName,Password)
Values (@empid,@empUserName,@emppass)
GO
/****** Object:  StoredProcedure [dbo].[LeaveEntryForNew]    Script Date: 08-11-2019 20:05:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LeaveEntryForNew] @DOJ date, @empid int
as
Begin 
 Insert into Leave_Tracking(Employee_ID,Leave_Type_ID,RemainingDays)
 Values(@empid,1,10-MONTH(@doj)*10/12),(@empid,2,10-MONTH(@doj)*10/12),(@empid,3,12-MONTH(@doj))

 End
GO
USE [master]
GO
ALTER DATABASE [HR] SET  READ_WRITE 
GO
