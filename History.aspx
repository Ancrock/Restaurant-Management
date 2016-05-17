<%@ Page Title="" Language="C#" MasterPageFile="~/Waiter.Master" AutoEventWireup="true" CodeBehind="History.aspx.cs" Inherits="WebApplication1.WebForm5" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:GridView ID="GridView1" runat="server" AllowSorting="True" CssClass="Grid" AutoGenerateColumns="False" DataKeyNames="sr_no" DataSourceID="SqlDataSource1">
        <Columns>
            <asp:BoundField DataField="sr_no" HeaderText="sr_no" InsertVisible="False" ReadOnly="True" SortExpression="sr_no" />
            <asp:BoundField DataField="tab_no" HeaderText="tab_no" SortExpression="tab_no" />
            <asp:BoundField DataField="name" HeaderText="name" SortExpression="name" />
            <asp:BoundField DataField="ord" HeaderText="ord" SortExpression="ord" />
            <asp:BoundField DataField="total" HeaderText="total" SortExpression="total" />
        </Columns>
    </asp:GridView>
    <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:masterConnectionString %>" SelectCommand="SELECT * FROM [backup_orders]"></asp:SqlDataSource>
</asp:Content>
