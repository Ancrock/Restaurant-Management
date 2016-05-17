using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;

namespace WebApplication1
{
    public partial class menu : System.Web.UI.Page
    {
        public int k(int i)

        {
            i = 1;
            return i;
        }
       public string final_order(string a, string b, string c, string d, string e, string f, string g, string h, string i, string j, string k, string l, string m, string n, string o, string p, string q, string r)
        {
            string temp;
            temp = a + b + c + d + e + f + g + h + i + j + k + l + m + n + o + p + q + r;
            return temp;
        }
  
        protected void Page_Load(object sender, EventArgs e)
        {
            Label3.Text = (string)Session["username"];
        }
             protected void Button1_Click(object sender, EventArgs e)
        {

        }

        protected void LinkButton2_Click(object sender, EventArgs e)
        {
            float a;
            float b;
            float c;
            float d;
            float e1;
            float f;
            float g;
            float h;
            float i;
            float j;
            float k;
            float l;
            float m;
            float n;
            float o;
            float p;
            float q;
            float r;
            a = Convert.ToInt32(TextBox1.Text);
            b = Convert.ToInt32(TextBox2.Text);
            c = Convert.ToInt32(TextBox3.Text);
            d = Convert.ToInt32(TextBox4.Text);
            e1 = Convert.ToInt32(TextBox5.Text);
            f = Convert.ToInt32(TextBox6.Text);
            g = Convert.ToInt32(TextBox7.Text);
            h = Convert.ToInt32(TextBox8.Text);
            i = Convert.ToInt32(TextBox9.Text);
            j = Convert.ToInt32(TextBox10.Text);
            k = Convert.ToInt32(TextBox11.Text);
            l = Convert.ToInt32(TextBox12.Text);
            m = Convert.ToInt32(TextBox13.Text);
            n = Convert.ToInt32(TextBox14.Text);
            o = Convert.ToInt32(TextBox15.Text);
            p = Convert.ToInt32(TextBox16.Text);
            q = Convert.ToInt32(TextBox17.Text);
            r = Convert.ToInt32(TextBox18.Text);

            double total;
            total = a * 4.5 + b * 4.5 + c * 4.5 + d*5.5 +e1*5+f*6.5+g*8.5+h*8.5+i*9.5+j*2.5+k*2+l*2.5+m*4.5+n*5.5+o*6.5+p*7+q*8+r*7.5;

            Label1.Text = Convert.ToString(total);

            string a1 = null;
            string b1 = null;
            string c1 = null;
            string d1 = null;
            string e2 = null;
            string f1 = null;
            string g1 = null;
            string h1 = null;
            string i1 = null;
            string j1 = null;
            string k1 = null;
            string l1 = null;
            string m1 = null;
            string n1 = null;
            string o1 = null;
            string p1 = null;
            string q1 = null;
            string r1 = null;

            if (a != 0)
            {
                a1 = a + " Tomato Soup; ";
            }
            if (b != 0)
            {
                b1 = b + " Veg Soup; ";
            }
            if (c != 0)
            {
                c1 = c + " Hot and sour soup; ";
            }
            if (d != 0)
            {
                d1 = d + " Brushetta; ";
            }
            if (e1 != 0)
            {
                e2 = e1 + " Onion Rings; ";
            }
            if (f != 0)
            {
                f1 = f + " Cheesy Balls; ";
            }
            if (g != 0)
            {
                g1 = g + " Red Curry; ";
            }
            if (h != 0)
            {
                h1 = h + " Spinach Curry; ";
            }
            if (i != 0)
            {
                i1 = i + " Egg Curry; ";
            }
            if (j != 0)
            {
                j1 = j + " Garlic Bread; ";
            }
            if (k != 0)
            {
                k1 = k + " Plain Bread; ";
            }
            if (l != 0)
            {
                l1 = l + " Crispy Bread; ";
            }
            if (m != 0)
            {
                m1 = m + " Plain rice; ";
            }
            if (n != 0)
            {
                n1 = n + " Veggy rice; ";
            }
            if (o != 0)
            {
                o1 = o + " Mix rice; ";
            }
            if (p != 0)
            {
                p1 = p + " Fruit pie; ";
            }
            if (q != 0)
            {
                q1 = q + " Choco Ice; ";
            }
            if (r != 0)
            {
                r1 = r + " Buttery Pie; ";
            }

            String conc;
            conc = final_order(a1,b1,c1,d1,e2,f1,g1,h1,i1,j1,k1,l1,m1,n1,o1,p1,q1,r1);

            Label2.Text = conc;
        }

        protected void LinkButton1_Click(object sender, EventArgs e)
        {
            try {
                SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString);

                con.Open();
               
                    if ((string)Session["username"] == null )
                {
                    string errorText = "Please Login to order ";
                    Response.Write(
         @"<SCRIPT LANGUAGE=""JavaScript"">alert('" + errorText + "')</SCRIPT>");

                }
                    if (Label2.Text == "")
                {
                    string errorText = "Please select some dish to order ";
                    Response.Write(
         @"<SCRIPT LANGUAGE=""JavaScript"">alert('" + errorText + "')</SCRIPT>");

                }
                if ((string)Session["username"] != null && Label2.Text != "")
                {

                    SqlCommand cmd1 = new SqlCommand("insert into order_customer(tab_no,name,ord,total) values('" + DropDownList1.Text + "','" + Label3.Text + "','" + Label2.Text + "','" + Label1.Text + "')", con);
                    cmd1.ExecuteNonQuery();

                    SqlCommand cmd2 = new SqlCommand("insert into backup_orders(tab_no,name,ord,total) values('" + DropDownList1.Text + "','" + Label3.Text + "','" + Label2.Text + "','" + Label1.Text + "')", con);
                    cmd2.ExecuteNonQuery();
                }

                con.Close();
            }
            catch (Exception ex)
            {
                string errorText = "Please select another table, Order has already been placed for the table";
                Response.Write(
     @"<SCRIPT LANGUAGE=""JavaScript"">alert('" + errorText + "')</SCRIPT>");
            }
        }
    }
}
