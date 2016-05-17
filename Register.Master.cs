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
  

    public partial class Site3 : System.Web.UI.MasterPage
    {
        public int numberPass(string pass)
        {
            int num = 0;
            foreach (char ch in pass)
            {
                if (char.IsDigit(ch))
                {
                    num++;
                }
                
            }
            return num;
        }

        public int Uppercase(string pass)
        {
            int num = 0;
            foreach (char ch in pass)
            {
                if (char.IsUpper(ch))
                {
                    num++;
                }

            }
            return num;
        }



        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button2_Click(object sender, EventArgs e)
        {
            const int Min_length = 7;
            string password = TextBox2.Text;
            if (password.Length < Min_length && numberPass(password) < 1 && Uppercase(password) < 1)
            {
                string errorText = "Password must have one uppercase and a lower case letter. Password must have a number and has to be more than 7 characters. ";
                Response.Write(
     @"<SCRIPT LANGUAGE=""JavaScript"">alert('" + errorText + "')</SCRIPT>");
            }
            if (password.Length >= Min_length && numberPass(password) >= 1 && Uppercase(password) >= 1)
            {
                if (DropDownList1.Text == "Cook")
                {
                    if (TextBox3.Text == "Cook123")
                    {
                        save();
                    }
                    if (TextBox3.Text != "Cook123")
                    {
                        Label2.Visible = true;
                    }

                }
                if (DropDownList1.Text == "Waiter")
                {
                    if (TextBox3.Text == "Waiter123")
                    {
                        save();
                    }
                    if (TextBox3.Text != "Waiter123")
                    {
                        Label2.Visible = true;
                    }

                }
                if (DropDownList1.Text == "Customer")
                {
                    Label2.Visible = false;
                    TextBox3.Visible = false;
                    Label1.Visible = false;
                    save();
                }

            }
        }

        protected void save() {
            try {

                SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString);

                con.Open();
                SqlCommand cmd1 = new SqlCommand("insert into register(username,password,type) values('" + TextBox1.Text + "','" + TextBox2.Text + "','" + DropDownList1.Text + "')", con);
                cmd1.ExecuteNonQuery();
                con.Close();
            }
            catch(Exception ex)
            {
                string errorText = "The username has already been taken. Please type another username ";
                Response.Write(
     @"<SCRIPT LANGUAGE=""JavaScript"">alert('" + errorText + "')</SCRIPT>");
            }
        }


        protected void Button1_Click(object sender, EventArgs e)
        {
            Response.Redirect("default.aspx");
        }

        protected void DropDownList1_SelectedIndexChanged(object sender, EventArgs e)
        {
            Label1.Visible = true;
            TextBox3.Visible = true;
        }

        protected void TextBox2_TextChanged(object sender, EventArgs e)
        {

        }
    }
}