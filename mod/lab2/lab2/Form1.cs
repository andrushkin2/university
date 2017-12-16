using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Windows.Forms;
using ZedGraph;


namespace lab2
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private double[] randArray;

        // Равномерное распределение
        private void UniformDistribution() 
        {
            Random rand = new Random();
            int N = int.Parse(unN.Text);
            double a = double.Parse(unA.Text);
            double b = double.Parse(unB.Text);

            randArray = new double[N];

            for (int i = 0; i < N; i++)
                randArray[i] = a + (b - a) * rand.NextDouble();

            CalculateStatValues();
            DrawHistogram();
        }

        // Гауссовское распределение
        private void GaussDistribution()
        {
            Random rand = new Random();
            int N = int.Parse(gaC.Text);          // count
            double m = double.Parse(gaM.Text);
            double sko = double.Parse(gaN.Text);  // sko
            int n = int.Parse(gaA.Text);          // from 6 to 12

            randArray = new double[N];
            for (int i = 0; i < N; i++)
            {
                double tmp = 0;
                for (int j = 0; j < n; j++)
                    tmp += rand.NextDouble();

                randArray[i] = m + sko*Math.Sqrt(12.0/n)*(tmp - (double) n/2);
            }

            CalculateStatValues();
            DrawHistogram();
        }

        // Экспоненциальное распределение
        private void ExponentialDistribution()
        {
            Random rand = new Random();
            int N = int.Parse(expCount.Text);
            double λ = double.Parse(expA.Text);

            randArray = new double[N];
            for (int i = 0; i < N; i++)
                randArray[i] = - Math.Log(rand.NextDouble()) / λ;

            CalculateStatValues();
            DrawHistogram();
        }

        // Гамма-распределение
        private void GammaDistribution()
        {
            Random rand = new Random();
            int N = int.Parse(gamCount.Text);   // count
            int η = int.Parse(gamN.Text);   
            double λ = double.Parse(gamA.Text);

            randArray = new double[N];
            for (int i = 0; i < N; i++)
            {
                double tmp = 1;
                for (int j = 0; j < η; j++)
                    tmp *= rand.NextDouble();

                randArray[i] = -Math.Log(tmp) / λ;
            }

            CalculateStatValues();
            DrawHistogram();
        }

        // Треугольное распределение
        private void TriangleDistribution()
        {
            Random rand = new Random();
            int N = int.Parse(trCount.Text);
            double a = double.Parse(trA.Text);
            double b = double.Parse(trB.Text);

            randArray = new double[N];

            for (int i = 0; i < N; i++)
            {
                double R1 = rand.NextDouble();
                double R2 = rand.NextDouble();
                randArray[i] = a + (b - a) * Math.Max(R1, R2);
            }
                

            CalculateStatValues();
            DrawHistogram();
        }

        // Распределение Симпсона
        private void SimpsonDistribution()
        {
            Random rand = new Random();
            int N = int.Parse(siCount.Text);
            double a = double.Parse(siA.Text);
            double b = double.Parse(siB.Text);

            randArray = new double[N];

            for (int i = 0; i < N; i++)
                randArray[i] = a/2 + (b/2 - a/2)*rand.NextDouble() + a/2 + (b/2 - a/2)*rand.NextDouble();

            CalculateStatValues();
            DrawHistogram();
        }


        private void CalculateStatValues()
        {
            double Mx = randArray.Sum() / randArray.Length;
            textBox_Mx.Text = Mx.ToString();

            double Dx = randArray.Sum(t => (t - Mx) * (t - Mx)) / (randArray.Length - 1);
            textBox_Dx.Text = Dx.ToString();

            textBox_sko.Text = (Math.Sqrt(Dx)).ToString();
        }

        private void DrawHistogram()
        {
            List<double> numbers = new List<double>(randArray);
            numbers.Sort();

            const int intervalsCount = 20;
            double width = numbers.Last() - numbers.First();

            double widthOfInterval = width / intervalsCount;

            double[] yValues = new double[intervalsCount]; 
            double[] xValues = new double[intervalsCount];

            xValues[0] = 0.0245 * width + numbers.First();
            for (int i = 1; i < intervalsCount; i++)
            {
                xValues[i] = xValues[i - 1] + widthOfInterval;
            }

            double xLeft = numbers.First(); 
            double xRight = xLeft + widthOfInterval; 
            int j = 0;
            for (int i = 0; i < intervalsCount; i++)
            {
                while (j < numbers.Count && xLeft <= numbers[j] && xRight > numbers[j])
                {
                    yValues[i] ++;
                    j++;
                }
                yValues[i] /= numbers.Count;
                xLeft = xRight;
                xRight += widthOfInterval;
            }

            GraphPane pane = zedGraphControl1.GraphPane;
            pane.XAxis.Title.Text = "Value";
            pane.YAxis.Title.Text = "Frequency";
            pane.Title.Text = "Graph";

            pane.CurveList.Clear();

            BarItem bar = pane.AddBar("", xValues, yValues, Color.LightGray);
            
            pane.BarSettings.MinClusterGap = 0.0f;

            pane.XAxis.Scale.Min = numbers.First();
            pane.XAxis.Scale.Max = numbers.Last();
            pane.XAxis.Scale.AlignH = AlignH.Center;

            zedGraphControl1.AxisChange();

            zedGraphControl1.Invalidate();
        }

        private void label5_Click(object sender, EventArgs e)
        {

        }

        private void button6_Click(object sender, EventArgs e)
        {
            UniformDistribution();
        }

        private void button5_Click(object sender, EventArgs e)
        {
            GaussDistribution();
        }

        private void button4_Click(object sender, EventArgs e)
        {
            ExponentialDistribution();        }

        private void button1_Click(object sender, EventArgs e)
        {
            GammaDistribution();
        }

        private void button3_Click(object sender, EventArgs e)
        {
            TriangleDistribution();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            SimpsonDistribution();
        }
    }
}
