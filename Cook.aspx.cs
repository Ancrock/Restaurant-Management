using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication1
{
    public partial class WebForm3 : System.Web.UI.Page
    {
        protected void GridView1_SelectedIndexChanged(object sender, EventArgs e)
        {

        }
        protected void Page_Load(object sender, EventArgs e)
        {
            Label1.Text = (string)Session["username"];
        }
        protected void GridView1_RowCommand(object sender, GridViewCommandEventArgs e)
        {
          /*  if (e.CommandName.CompareTo("execute") == 0)
            {
                int index = Convert.ToInt32(e.CommandArgument);

                // Retrieve the row that contains the button 
                // from the Rows collection.
                GridViewRow row = GridView1.Rows[index];
                string r;
                r = "Hello";
                Label1.Text = r;
            }*/
        }
        protected void Gridview1_CellContentClick(object sender, GridViewCommandEventArgs e)
        {
           /* if (e.CommandName == "do")
            {
                string r;
                r = "Hello";
                Label1.Text = r;

            }*/
        }

        protected void SqlDataSource1_Selecting(object sender, SqlDataSourceSelectingEventArgs e)
        {

        }
    }
}