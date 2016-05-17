<%@ Page Title="" Language="C#" MasterPageFile="~/Cook.Master" AutoEventWireup="true" CodeBehind="Cook.aspx.cs" Inherits="WebApplication1.WebForm3" %>
<asp:Content ID="Content1" runat="server" contentplaceholderid="ContentPlaceHolder1">
           <h1> Hello
            <asp:Label ID="Label1" runat="server"></asp:Label>
            ! Here are the orders that are to be cooked. Please provide an ETA for the order to be cooked.
            <br />
            Also, please update the status as cooked once the order is cooked.&nbsp;</h1><asp:GridView ID="GridView1" runat="server" AllowSorting="True" AutoGenerateColumns="False" DataKeyNames="tab_no" CssClass="Grid" DataSourceID="SqlDataSource1" Width="737px">
        <Columns>
            <asp:CommandField ShowEditButton="True" />
            <asp:BoundField DataField="tab_no" HeaderText="Table Number" ReadOnly="True" SortExpression="tab_no" />
            <asp:BoundField DataField="name" HeaderText="Customer name" SortExpression="name" />
            <asp:BoundField DataField="ord" HeaderText="Order Details" SortExpression="ord" />
            <asp:BoundField DataField="total" HeaderText="total" SortExpression="total" />
            <asp:BoundField DataField="ETA" HeaderText="ETA" SortExpression="ETA" />
            <asp:BoundField DataField="cooked" HeaderText="Status" SortExpression="cooked" />
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
</asp:Content>

