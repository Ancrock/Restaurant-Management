<%@ Page Title="" Language="C#" MasterPageFile="~/Customer.Master" AutoEventWireup="true" CodeBehind="status.aspx.cs" Inherits="WebApplication1.status" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>
    Hey&nbsp;
    <asp:Label ID="Label1" runat="server"></asp:Label>
&nbsp;! Check here to see if the chef has an ETA on your order..</h1>  
    <div id="sidebar" class="auto-style1">
        </div>
<p>
    
    <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" GridLines="None" CssClass="Grid" DataKeyNames="tab_no" DataSourceID="SqlDataSource1">
        <Columns>
            <asp:BoundField DataField="tab_no" HeaderText="Table Number" ReadOnly="True" SortExpression="tab_no" />
            <asp:BoundField DataField="name" HeaderText="name" SortExpression="name" />
            <asp:BoundField DataField="ord" HeaderText="Order" SortExpression="ord" />
            <asp:BoundField DataField="total" HeaderText="total" SortExpression="total" />
            <asp:BoundField DataField="ETA" HeaderText="ETA" SortExpression="ETA" />
            <asp:BoundField DataField="cooked" HeaderText="Status" SortExpression="cooked" />
        </Columns>
    </asp:GridView>
</p>
    <p>
    
        &nbsp;</p>
    
    <br />
    <br />
    
    <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:masterConnectionString %>" SelectCommand="SELECT * FROM [order_customer] WHERE ([name] = @name)">
        <SelectParameters>
            <asp:SessionParameter Name="name" SessionField="username" Type="String" />
        </SelectParameters>
    </asp:SqlDataSource>
    <br />
    
</asp:Content>
