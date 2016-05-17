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
    public partial class Site1 : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString);

            SqlDataAdapter da1 = new SqlDataAdapter("select * from register r where r.username='" + TextBox1.Text + "'", con);
            DataTable dt1 = new DataTable();
            da1.Fill(dt1);
            string a;
            string u;
            u = TextBox1.Text;
            Session["username"] = u;
            try
            {
                string x = dt1.Rows[0][0].ToString();
                string y = dt1.Rows[0][1].ToString();

                if (x == TextBox1.Text && y == TextBox2.Text)
                {
                    a = dt1.Rows[0][2].ToString();

                    if (a == "Customer")
                    {
                        Response.Redirect("Customer1.aspx");
                    }
                    if (a == "Cook")
                    {
                        Response.Redirect("Cook.aspx");
                    }
                    if (a == "Waiter")
                    {
                        Response.Redirect("Waiter.aspx");
                    }
                }

                if (x != TextBox1.Text && y == TextBox2.Text)
                {
                    Label1.Text = "Username or password incorrect";
                }

                if (x == TextBox1.Text && y != TextBox2.Text)
                {
                    Label1.Text = "Username or password incorrect";
                }
                if (x != TextBox1.Text && y != TextBox2.Text)
                {
                    Label1.Text = "Username or password incorrect";
                }



            }
            catch (Exception ex)
            {
                string errorText = "Username or password not correct";
                Response.Write(
     @"<SCRIPT LANGUAGE=""JavaScript"">alert('" + errorText + "')</SCRIPT>");

            }
        }

       

        protected void Button2_Click(object sender, EventArgs e)
        {
            Response.Redirect("Register.aspx");
        }
    }
}