drop table register
GO
CREATE TABLE [dbo].[register](
	[username] [varchar](50) NOT NULL PRIMARY KEY,
	[password] [varchar](50) NULL,
	[type] [varchar](50) NULL,
) ON [PRIMARY]
GO
drop table order_customer
GO
CREATE TABLE [dbo].[order_customer](
	[tab_no] [integer] NOT NULL PRIMARY KEY,
	[name] [varchar](50) NULL,
	[ord] [varchar](50) NULL,
	[total] [varchar](50) NULL,
	[ETA] [varchar](50) NULL,
	[cooked] [varchar](50) NULL,

	)ON [PRIMARY]
GO
drop table backup_orders
GO
CREATE TABLE [dbo].[backup_orders](
	[sr_no] [integer] IDENTITY (1,1) NOT NULL PRIMARY KEY,
	[tab_no] [integer] NULL,
	[name] [varchar](50) NULL,
	[ord] [varchar](50) NULL,
	[total] [varchar](50) NULL,
	)ON [PRIMARY]
GO
