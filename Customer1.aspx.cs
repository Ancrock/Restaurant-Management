using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Media;

namespace WebApplication1
{
    public partial class Customer1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Label1.Text = (string)Session["username"];
          //  SoundPlayer mplayer = new SoundPlayer();
           // mplayer.SoundLocation = "C:/Users/Ancrock/Desktop/Screenshots 543/food3.wav";
           // mplayer.Play();
        }
    }
}