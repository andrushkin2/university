using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;
using System.IO;
using ZedGraph;

namespace lab1
{
    public partial class Form1 : Form
    {
        Randomizer Rand;
        List<double> RandArray;

        public Form1()
        {
            InitializeComponent();
        }

        private void FindPeriod()
        {
            RandArray = new List<double>();

            for (int i = 0; i < 2000000; i++)
            {
                RandArray.Add(Rand.Next());
            }

            double Xv = Rand.Current();

            Rand.Reset();
            int i1 = -1, i2 = -1;
            bool flag =  false;

            // find period
            for (int i = 0; i < RandArray.Count; i++)
            {
                if (RandArray[i] == Xv)
                {
                    if (!flag)
                    {
                        flag = true;
                        i1 = i;                        
                        continue;
                    }
                    else
                    {
                        i2 = i;
                        break;
                    }
                }
            }
            int period = i2 - i1;

            // find aPeriod
            int i3 = 0;
            while (RandArray[i3] != RandArray[i3 + period])
            {
                i3++;
            }
            int aperiod = i3 + period;

            RandArray.RemoveRange(aperiod, RandArray.Count - aperiod);

            if (i2 == -1 || i1 == -1)
            {
                textBox_period.Text = "No period";
            }
            else
            {
                textBox_period.Text = period.ToString();
                textBox_no_period.Text = aperiod.ToString();
            }
        }

        private void CalculateStatValues()
        {
            double Mx = 0;
            for (int i = 0; i < RandArray.Count; i++)
            {
                Mx += RandArray[i];
            }
            Mx /= RandArray.Count;
            textBox_Mx.Text = Mx.ToString();

            double Dx = 0;
            for (int i = 0; i < RandArray.Count; i++)
            {
                Dx += (RandArray[i] - Mx) * (RandArray[i] - Mx);
            }
            Dx /= (RandArray.Count - 1);
            textBox_Dx.Text = Dx.ToString();

        }

        private void CheckUniformity()
        {
            int K = 0, N = RandArray.Count;

            for (int i = 0; i < N; i += 2)
            {
                if (i + 1 >= N)
                {
                    break;
                }

                if (RandArray[i] * RandArray[i] + RandArray[i + 1] * RandArray[i + 1] < 1.0)
                {
                    K++;
                }
            }

            textBox_2kn.Text = (2 * (double)K / N).ToString();
        }

        private void DrawGraph()
        {
            int N = RandArray.Count;

            // get a pane for drawing
            ZedGraph.GraphPane pane = zedGraphControl1.GraphPane;
            pane.Title.Text = "Graph";

            // clear pane
            pane.CurveList.Clear();

            const int partscount = 20;
            const double partLength = 1.0 / partscount;

            double[] yValues = new double[partscount]; 
            double[] xValues = new double[partscount];

            xValues[0] = 0.0245;
            for (int i = 1; i < partscount; i++)
            {
                xValues[i] = xValues[i - 1] + 1.0 / partscount;
            }

            for (int i = 0; i < partscount; i++)
            {
                for (int j = 0; j < N; j++)
                {
                    if ((RandArray[j] >= i * partLength) && (RandArray[j] < (i + 1) * partLength))
                    {
                            yValues[i] ++;
                    }
                }
                yValues[i] /= N;
            }

            ZedGraph.BarItem bar = pane.AddBar("", xValues, yValues, Color.DimGray);

            pane.BarSettings.MinClusterGap = 0.5f;

            pane.XAxis.Scale.Min = 0;
            pane.XAxis.Scale.Max = 1;
            pane.XAxis.Scale.AlignH = AlignH.Center;

            // update axes
            zedGraphControl1.AxisChange();

            // update chart
            zedGraphControl1.Invalidate();
        }

        private void calculateButton_Click(object sender, EventArgs e)
        {
            Rand = new Randomizer(ulong.Parse(textBox_a.Text), ulong.Parse(textBox_m.Text), ulong.Parse(textBox_R0.Text));
            FindPeriod();

            DrawGraph();

            CalculateStatValues();
            CheckUniformity();

            RandArray.Clear();
        }

        private void label10_Click(object sender, EventArgs e)
        {

        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }
    }
}
