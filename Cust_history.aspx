<%@ Page Title="" Language="C#" MasterPageFile="~/Customer.Master" AutoEventWireup="true" CodeBehind="Cust_history.aspx.cs" Inherits="WebApplication1.WebForm7" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    Hello&nbsp;
<asp:Label ID="Label1" runat="server"></asp:Label>
&nbsp;! Here are your previous orders!<br />
<asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" DataKeyNames="sr_no" CssClass="Grid" DataSourceID="SqlDataSource1">
    <Columns>
        <asp:BoundField DataField="sr_no" HeaderText="sr_no" InsertVisible="False" ReadOnly="True" SortExpression="sr_no" />
        <asp:BoundField DataField="tab_no" HeaderText="tab_no" SortExpression="tab_no" />
        <asp:BoundField DataField="name" HeaderText="name" SortExpression="name" />
        <asp:BoundField DataField="ord" HeaderText="ord" SortExpression="ord" />
        <asp:BoundField DataField="total" HeaderText="total" SortExpression="total" />
    </Columns>
</asp:GridView>
<asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:masterConnectionString %>" SelectCommand="SELECT * FROM [backup_orders] WHERE ([name] = @name)">
    <SelectParameters>
        <asp:SessionParameter Name="name" SessionField="Username" Type="String" />
    </SelectParameters>
</asp:SqlDataSource>
</asp:Content>
