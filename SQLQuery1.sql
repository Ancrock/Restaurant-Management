drop table student_data
GO
CREATE TABLE [dbo].[register](
	[username] [varchar](50) NOT NULL PRIMARY KEY,
	[password] [varchar](50) NULL,
	[type] [varchar](50) NULL,
) ON [PRIMARY]
GO