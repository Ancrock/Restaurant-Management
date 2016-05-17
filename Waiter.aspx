<%@ Page Title="" Language="C#" MasterPageFile="~/Waiter.Master" AutoEventWireup="true" CodeBehind="Waiter.aspx.cs" Inherits="WebApplication1.WebForm4" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>
        Welcome&nbsp;
        <asp:Label ID="Label1" runat="server"></asp:Label>
&nbsp;! Here are the orders which are currently being cooked or ready to serve ! Please serve the orders which are already cooked to the resepective tables.</h1>
    <p>
        <asp:GridView ID="GridView1" runat="server" AllowSorting="True" CssClass="Grid" AutoGenerateColumns="False" DataKeyNames="tab_no" DataSourceID="SqlDataSource1">
            <Columns>
                <asp:CommandField ShowDeleteButton="True" ShowEditButton="True" />
                <asp:BoundField DataField="tab_no" HeaderText="tab_no" ReadOnly="True" SortExpression="tab_no" />
                <asp:BoundField DataField="name" HeaderText="name" SortExpression="name" />
                <asp:BoundField DataField="ord" HeaderText="ord" SortExpression="ord" />
                <asp:BoundField DataField="total" HeaderText="total" SortExpression="total" />
                <asp:BoundField DataField="ETA" HeaderText="ETA" SortExpression="ETA" />
                <asp:BoundField DataField="cooked" HeaderText="cooked" SortExpression="cooked" />
            </Columns>
        </asp:GridView>
        <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:masterConnectionString %>" DeleteCommand="DELETE FROM [order_customer] WHERE [tab_no] = @tab_no" InsertCommand="INSERT INTO [order_customer] ([tab_no], [name], [ord], [total], [ETA], [cooked]) VALUES (@tab_no, @name, @ord, @total, @ETA, @cooked)" SelectCommand="SELECT * FROM [order_customer]" UpdateCommand="UPDATE [order_customer] SET [name] = @name, [ord] = @ord, [total] = @total, [ETA] = @ETA, [cooked] = @cooked WHERE [tab_no] = @tab_no">
            <DeleteParameters>
                <asp:Parameter Name="tab_no" Type="Int32" />
            </DeleteParameters>
            <InsertParameters>
                <asp:Parameter Name="tab_no" Type="Int32" />
                <asp:Parameter Name="name" Type="String" />
                <asp:Parameter Name="ord" Type="String" />
                <asp:Parameter Name="total" Type="String" />
                <asp:Parameter Name="ETA" Type="String" />
                <asp:Parameter Name="cooked" Type="String" />
            </InsertParameters>
            <UpdateParameters>
                <asp:Parameter Name="name" Type="String" />
                <asp:Parameter Name="ord" Type="String" />
                <asp:Parameter Name="total" Type="String" />
                <asp:Parameter Name="ETA" Type="String" />
                <asp:Parameter Name="cooked" Type="String" />
                <asp:Parameter Name="tab_no" Type="Int32" />
            </UpdateParameters>
        </asp:SqlDataSource>
    </p>
</asp:Content>
