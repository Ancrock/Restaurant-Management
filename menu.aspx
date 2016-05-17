<%@ Page Title="" Language="C#" MasterPageFile="~/Customer.Master" AutoEventWireup="true" CodeBehind="menu.aspx.cs" Inherits="WebApplication1.menu" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <head>
        <link rel="stylesheet" type="text/css" href="CSS/MyStyle.css" />
        <link rel="stylesheet" type="text/css" href="MiscCss/head.css" />
   <link rel="stylesheet" type="text/css" href="MiscCss/bundle-bundle_jquery-tools_head.css" />
    </head>
       

   <H1>Hello ! 
       <asp:Label ID="Label3" runat="server"></asp:Label>
&nbsp;Here is our menu for today! Select the table you are seated at and select the dishes. Once you are done, just press view order and then place order</H1>
    <p>

    Please tell us which table you are seated so that we can bring the order to you:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <asp:DropDownList ID="DropDownList1" CssClass="dropdown" runat="server">
            <asp:ListItem Selected="True">1</asp:ListItem>
            <asp:ListItem>2</asp:ListItem>
            <asp:ListItem>3</asp:ListItem>
            <asp:ListItem>4</asp:ListItem>
            <asp:ListItem>5</asp:ListItem>
            <asp:ListItem>6</asp:ListItem>
            <asp:ListItem>7</asp:ListItem>
            <asp:ListItem>8</asp:ListItem>
            <asp:ListItem>9</asp:ListItem>
            <asp:ListItem>10</asp:ListItem>
            <asp:ListItem>11</asp:ListItem>
            <asp:ListItem>12</asp:ListItem>
            <asp:ListItem>13</asp:ListItem>
            <asp:ListItem>14</asp:ListItem>
            <asp:ListItem>15</asp:ListItem>
            <asp:ListItem>16</asp:ListItem>
            <asp:ListItem>17</asp:ListItem>
            <asp:ListItem>18</asp:ListItem>
            <asp:ListItem>19</asp:ListItem>
            <asp:ListItem>20</asp:ListItem>
        </asp:DropDownList>
    </p>
    <div class="boxes" id="sect1">
               
        <a href="menu.aspx" class="sqr clr01" id="tomato_soup">
            <div class="sqr_padd">
                <span class="title">TOMATO SOUP</span>
                <div class="sqr_txt" style="margin-top: 127px;"> Rich and creamy tomato pury served with toast</div>
                <img src="Images/SOUP/tomatoe soup.jpg" alt="TOMSOUP" style="margin-top: 0px; top: 38px; left: -1px; width: 187px; height: 114px;"/></div>
        </a>

     <a href="menu.aspx" class="sqr clr02" id="veg_soup">
            <div class="sqr_padd">
                <span class="title">VEG SOUP</span>
                <div class="sqr_txt" style="margin-top: 127px;"> Blend of healthy vegetables scented with mint </div>
                <img src="Images/SOUP/veg soup.jpg" alt="VEGSOUP" style="margin-top: 0px; top: 38px; left: 0px; width: 199px; height: 114px;"/>
            </div>
        </a>
           
   
        <a href="menu.aspx" class="sqr clr02" id="hot&sour_soup">
            <div class="sqr_padd">
                <span class="title">HOT&SOUR SOUP</span>
                <div class="sqr_txt" style="margin-top: 127px;">A sesame & pepper veg soup</div>
                <img src="Images/SOUP/hot_sour soup.jpg" alt="VEGSOUP" style="margin-top: 0px; top: 38px; left: -1px; width: 200px; height: 114px;"/>
            </div>
        </a>
        </div>
    <div class="boxes">
&nbsp;&nbsp;TOMATO SOUP--$4.50&nbsp;<asp:TextBox ID="TextBox1" runat="server" Width="20px">0</asp:TextBox>  
       
   &nbsp;&nbsp;VEG SOUP--$4.50&nbsp; <asp:TextBox ID="TextBox2" runat="server" Width="20px">0</asp:TextBox>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HOT&SOUR SOUP--$4.50&nbsp;<asp:TextBox ID="TextBox3" runat="server" Width="20px">0</asp:TextBox>
    </div>



    
    <div class="boxes" id="sect2">
               
        <a href="menu.aspx" class="sqr clr01" id="appe1">
            <div class="sqr_padd">
                <span class="title">BRUSHETTA</span>
                <div class="sqr_txt" style="margin-top: 127px;"> Garlic Bread with tomato and onion dipplings</div>
                <img src="Images/APPETIZER/appe3.jpg" alt="brus" style="margin-top: 0px; top: 38px; left: -1px; width: 187px; height: 114px;"/></div>
        </a>

     <a href="menu.aspx" class="sqr clr02" id="app2">
            <div class="sqr_padd">
                <span class="title">ONION RINGS</span>
                <div class="sqr_txt" style="margin-top: 127px;"> Fried Onion rings with red Sauce</div>
                <img src="Images/APPETIZER/appe22.jpg" alt="onion" style="margin-top: 0px; top: 38px; left: 0px; width: 199px; height: 114px;"/>
            </div>
        </a>
           
   
        <a href="menu.aspx" class="sqr clr02" id="app3">
            <div class="sqr_padd">
                <span class="title">CHEESY BALLS</span>
                <div class="sqr_txt" style="margin-top: 127px;"> Grilled Mushrood stuffed with mozrella cheese</div>
                <img src="Images/APPETIZER/appe11.jpg" alt="mush" style="margin-top: 0px; top: 38px; left: -1px; width: 200px; height: 114px;"/>
            </div>
        </a>
        </div>
    <div class="boxes">
&nbsp;&nbsp;&nbsp;BRUSHEETA--$5.50&nbsp;<asp:TextBox ID="TextBox4" runat="server" Width="20px">0</asp:TextBox>  
       
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ONION RINGS--$5.00&nbsp; <asp:TextBox ID="TextBox5" runat="server" Width="20px">0</asp:TextBox>
   &nbsp;CHEESY BALLS--$6.50&nbsp;<asp:TextBox ID="TextBox6" runat="server" Width="20px">0</asp:TextBox>
    </div>





    
    
    <div class="boxes"id="sect3">
               
        <a href="Customer.aspx" class="sqr clr01" id="mc1">
            <div class="sqr_padd">
                <span class="title">RED CURRY</span>
                <div class="sqr_txt" style="margin-top: 127px;"> Chicken Curry with the aroma of mint</div>
                <img src="Images/MAIN COURCE/curry1.jpg" alt="rc" style="margin-top: 0px; top: 38px; left: -1px; width: 187px; height: 114px;"/></div>
        </a>

     <a href="Customer.aspx" class="sqr clr02" id="mc2">
            <div class="sqr_padd">
                <span class="title">SPINACH CURRY</span>
                <div class="sqr_txt" style="margin-top: 127px;"> Spinach with the tofu and sour cream </div>
                <img src="Images/MAIN COURCE/curry2.jpg" alt="sc" style="margin-top: 0px; top: 38px; left: -7px; width: 158px; height: 114px;"/>
            </div>
        </a>
           
   
        <a href="Customer.aspx" class="sqr clr02" id="mc3">
            <div class="sqr_padd">
                <span class="title">EGG CURRY</span>
                <div class="sqr_txt" style="margin-top: 127px;"> Boiled eggs with tomatoe curry</div>
                <img src="Images/MAIN COURCE/curry3.jpg" alt="ec" style="margin-top: 0px; top: 38px; left: -1px; width: 200px; height: 114px;"/>
            </div>
        </a>
        </div>
    <div class="boxes">
&nbsp;&nbsp;&nbsp;RED CURRY--$8.50&nbsp;<asp:TextBox ID="TextBox7" runat="server" Width="20px">0</asp:TextBox>  
       
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SPINACH CURRY--$8.50&nbsp; <asp:TextBox ID="TextBox8" runat="server" Width="20px">0</asp:TextBox>
   &nbsp;EGG CURRY--$9.50&nbsp;<asp:TextBox ID="TextBox9" runat="server" Width="20px">0</asp:TextBox>
    </div>




        <div class="boxes" id="sect4">
               
        <a href="Customer.aspx" class="sqr clr01" id="b1">
            <div class="sqr_padd">
                <span class="title">GARLIC BREAD</span>
                <div class="sqr_txt" style="margin-top: 127px;"> GRILLED BREAD STUFFED WITH GARLIC</div>
                <img src="Images/BREADS/bread.jpg" alt="gb" style="margin-top: 0px; top: 38px; left: -1px; width: 187px; height: 114px;"/></div>
        </a>

     <a href="Customer.aspx" class="sqr clr02" id="b2">
            <div class="sqr_padd">
                <span class="title">PLAIN BREAD</span>
                <div class="sqr_txt" style="margin-top: 127px;"> Plain Bread with butter/cheese</div>
                <img src="Images/BREADS/bread1.jpg" alt="pb" style="margin-top: 0px; top: 38px; left: 0px; width: 158px; height: 114px;"/>
            </div>
        </a>
           
   
        <a href="Customer.aspx" class="sqr clr02" id="b3">
            <div class="sqr_padd">
                <span class="title">CRISPY BREAD</span>
                <div class="sqr_txt" style="margin-top: 127px;"> Plain Crisy bread  with butter/cheese</div>
                <img src="Images/BREADS/bread3.jpg" alt="cb" style="margin-top: 0px; top: 38px; left: -1px; width: 200px; height: 114px;"/>
            </div>
        </a>
        </div>
    <div class="boxes">
&nbsp;&nbsp;&nbsp;GARLIC BREAD--$2.50&nbsp;<asp:TextBox ID="TextBox10" runat="server" Width="20px">0</asp:TextBox>  
       
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PLAIN BREAD--$2.00&nbsp; <asp:TextBox ID="TextBox11" runat="server" Width="20px">0</asp:TextBox>
   &nbsp;CRISPY BREAD--$2.50&nbsp;<asp:TextBox ID="TextBox12" runat="server" Width="20px">0</asp:TextBox>
    </div>




    <div class="boxes" id="sect5">
               
        <a href="Customer.aspx" class="sqr clr01" id="rice1">
            <div class="sqr_padd">
                <span class="title">PLAIN RICE</span>
                <div class="sqr_txt" style="margin-top: 127px;"> Plain boiled rice with peanuts</div>
                <img src="Images/RICES/RICE1.jpg" alt="pc" style="margin-top: 0px; top: 38px; left: -1px; width: 187px; height: 114px;"/></div>
        </a>

     <a href="Customer.aspx" class="sqr clr02" id="rice2">
            <div class="sqr_padd">
                <span class="title">VEGGY RICE</span>
                <div class="sqr_txt" style="margin-top: 127px;"> rice with healthy veggies </div>
                <img src="Images/RICES/RICE2.jpg" alt="vr" style="margin-top: 0px; top: 38px; left: -7px; width: 158px; height: 114px;"/>
            </div>
        </a>
           
   
        <a href="Customer.aspx" class="sqr clr02" id="rice3">
            <div class="sqr_padd">
                <span class="title">MIX RICE</span>
                <div class="sqr_txt" style="margin-top: 127px;"> Rice with healthy cashews,nuts and almonds</div>
                <img src="Images/RICES/RICE3.jpg" alt="mr" style="margin-top: 0px; top: 37px; left: -1px; width: 200px; height: 114px;"/>
            </div>
        </a>
        </div>
    <div class="boxes">
&nbsp;&nbsp;&nbsp;PLAIN RICE--$4.50&nbsp;<asp:TextBox ID="TextBox13" runat="server" Width="20px">0</asp:TextBox>  
       
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;VEGGY RICE--$5.50&nbsp; <asp:TextBox ID="TextBox14" runat="server" Width="20px">0</asp:TextBox>
   &nbsp;MIX RICE--$6.50&nbsp;<asp:TextBox ID="TextBox15" runat="server" Width="20px">0</asp:TextBox>
    </div>



    <div class="boxes"id="sect6">
               
        <a href="Customer.aspx" class="sqr clr01" id="D1">
            <div class="sqr_padd">
                <span class="title">FRUIT PIE</span>
                <div class="sqr_txt" style="margin-top: 127px;"> Fruit cake with cherries and strawberries </div>
                <img src="Images/DESSERTS/desst1.jpg" alt="fp" style="margin-top: 0px; top: 32px; left: -20px; width: 172px; height: 114px;"/></div>
        </a>

     <a href="Customer.aspx" class="sqr clr02" id="D2">
            <div class="sqr_padd">
                <span class="title">CHOCO ICE</span>
                <div class="sqr_txt" style="margin-top: 127px;"> Chocolate cake with vanilla icecream </div>
                <img src="Images/DESSERTS/desst2.jpg" alt="ci" style="margin-top: 0px; top: 38px; left: -7px; width: 158px; height: 114px;"/>
            </div>
        </a>
           
   
        <a href="Customer.aspx" class="sqr clr02" id="d3">
            <div class="sqr_padd">
                <span class="title">BUTTERY PIE</span>
                <div class="sqr_txt" style="margin-top: 127px;"> Buttery Pumpkin Pie cake</div>
                <img src="Images/DESSERTS/desst3.jpg" alt="bp" style="margin-top: 0px; top: 38px; left: -41px; width: 200px; height: 114px;"/>
            </div>
        </a>
        </div>
    <div class="boxes">
&nbsp;&nbsp;&nbsp;FRUIT PIE--$7.00&nbsp;<asp:TextBox ID="TextBox16" runat="server" Width="20px">0</asp:TextBox>  
       
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CHOCO ICE--$8.00&nbsp; <asp:TextBox ID="TextBox17" runat="server" Width="20px">0</asp:TextBox>
   &nbsp;BUTTERY PIE--$7.50&nbsp;<asp:TextBox ID="TextBox18" runat="server" Width="20px">0</asp:TextBox>
    </div>





            <p>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;<asp:LinkButton ID="LinkButton2" runat="server" CssClass="button-link" OnClick="LinkButton2_Click">View Order</asp:LinkButton>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;<asp:LinkButton ID="LinkButton1" runat="server" CssClass="button-link" OnClick="LinkButton1_Click">Place Order</asp:LinkButton>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Total:
    <asp:Label ID="Label1" CssClass="misc" runat="server"></asp:Label>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <asp:Label ID="Label2" CssClass="misc" runat="server"></asp:Label>
</p>
<br />
    
<script type="text/javascript">    
(document.ready(function('sqr_txt'){ document.onMouseOver(function('img') { slidedown('slow') })();
})());
</script>
        <script src="miscjs/facydefer.js" type="text/javascript"></script>
<script src="miscjs/eservicesdefer.js" type="text/javascript"></script>
<script src="miscjs/ga.js" type="text/javascript"></script>
<script type="text/javascript" src="../miscjs/jquery-1.4.1.min.js"></script>
<script src="miscjs/jquery-1.10.1.js" type="text/javascript"></script>
<script src="miscjs/bundle-bundle_civilregistry-sp_defer.js" type="text/javascript" ></script>
<script src="miscjs/bundle-bundle_common-js_defer.js" type="text/javascript" ></script>
<script src="miscjs/bundle-bundle_jquery-tools_defer.js" type="text/javascript" ></script> 
<script src="miscjs/bundle-bundle_myeservices_defer.js" type="text/javascript" ></script>
<script src="miscjs/bundle-bundle_jquery_head.js" type="text/javascript" ></script>

    </asp:Content>