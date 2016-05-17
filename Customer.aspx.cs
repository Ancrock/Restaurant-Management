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
    public partial class WebForm2 : System.Web.UI.Page
    {
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

            a = Convert.ToInt32(TextBox1.Text);
            b = Convert.ToInt32(TextBox2.Text);
            c = Convert.ToInt32(TextBox3.Text);

            double total;
            total = a * 4 + b * 5 + c * 3.5;

            Label1.Text = Convert.ToString(total);

            string p = null;
            string q = null;
            string r = null;

            if (a != 0)
            {
                p = a + " egg omelette; ";
            }
            if (b != 0)
            {
                q = b + "Pancakes; ";
            }
            if (c != 0)
            {
                r = c + "Cheeseburger; ";
            }

            String f;
            f = p + q + r;

            Label2.Text = f;
        }

        protected void LinkButton1_Click(object sender, EventArgs e)
        {
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString);

            con.Open();
            SqlCommand cmd1 = new SqlCommand("insert into order_customer(tab_no,name,ord,total) values('" + DropDownList1.Text + "','" + Label3.Text + "','" + Label2.Text + "','" + Label1.Text + "')", con);
            cmd1.ExecuteNonQuery();
            SqlCommand cmd2 = new SqlCommand("insert into backup_orders(tab_no,name,ord,total) values('" + DropDownList1.Text + "','" + Label3.Text + "','" + Label2.Text + "','" + Label1.Text + "')", con);
            cmd2.ExecuteNonQuery();

            con.Close();
        }
    }
}