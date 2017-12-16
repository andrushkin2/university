using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Text;
using System.Windows.Forms;
using ZedGraph;
using System.Linq;


namespace lab2
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            radioButton_uniform.Checked = true;
        }

        private double[] randArray;

        private void radioButton_uniform_CheckedChanged(object sender, EventArgs e)
        {
            if (!radioButton_uniform.Checked) return;
            label1.Text = "a = "; textBox1.Text = "5";
            label2.Text = "b = "; textBox2.Text = "10";
            label3.Text = "N = "; textBox3.Text = "10000";
        }

        private void radioButton_gauss_CheckedChanged(object sender, EventArgs e)
        {
            if (radioButton_gauss.Checked)
            {
                label1.Text = "m = ";
                textBox1.Text = "5";
                label2.Text = "σ = ";
                textBox2.Text = "10";
                label3.Text = "n = ";
                textBox3.Text = "6";
                label4.Text = "N = ";
                textBox4.Text = "10000";
                label4.Visible = true;
                textBox4.Visible = true;
            }
            else
            {
                label4.Visible = false;
                textBox4.Visible = false;
            }
            
        }

        private void radioButton_exp_CheckedChanged(object sender, EventArgs e)
        {
            if (radioButton_exp.Checked)
            {
                label1.Text = "λ = "; textBox1.Text = "10";
                label2.Text = "N = "; textBox2.Text = "10000";
                label3.Visible = false;
                textBox3.Visible = false;
            }
            else
            {
                label3.Visible = true;
                textBox3.Visible = true;
            }
            
        }

        private void radioButton_gamma_CheckedChanged(object sender, EventArgs e)
        {
            if (!radioButton_gamma.Checked) return;
            label1.Text = "η = "; textBox1.Text = "18";
            label2.Text = "λ = "; textBox2.Text = "2,5";
            label3.Text = "N = "; textBox3.Text = "10000";
        }

        private void radioButton_triangle_CheckedChanged(object sender, EventArgs e)
        {
            if (!radioButton_triangle.Checked) return;
            label1.Text = "a = "; textBox1.Text = "3";
            label2.Text = "b = "; textBox2.Text = "9";
            label3.Text = "N = "; textBox3.Text = "10000";
        }

        private void radioButton_simpson_CheckedChanged(object sender, EventArgs e)
        {
            if (!radioButton_simpson.Checked) return;
            label1.Text = "a = "; textBox1.Text = "18";
            label2.Text = "b = "; textBox2.Text = "30";
            label3.Text = "N = "; textBox3.Text = "10000";
        }

        private void calculate_button_Click(object sender, EventArgs e)
        {
            if (radioButton_uniform.Checked)
                UniformDistribution();
            
            else if (radioButton_gauss.Checked)
                GaussDistribution();
            
            else if (radioButton_exp.Checked)
                ExponentialDistribution();
            
            else if (radioButton_gamma.Checked)
                GammaDistribution();
            
            else if (radioButton_triangle.Checked)
                TriangleDistribution();
            
            else if (radioButton_simpson.Checked)
                SimpsonDistribution();
        }


        // Равномерное распределение
        private void UniformDistribution() 
        {
            Random rand = new Random();
            int N = int.Parse(textBox3.Text);
            double a = double.Parse(textBox1.Text);
            double b = double.Parse(textBox2.Text);

            randArray = new double[N];

            for (int i = 0; i < N; i++)
                randArray[i] = a + (b - a) * rand.NextDouble();

            CalculateStatValues();
            DrawHistogram();
            distNameLabel.Text = "Равномерное распределение\r\na = " + a.ToString() + ", b = " + b.ToString() + ", N = " + N.ToString();
        }

        // Гауссовское распределение
        private void GaussDistribution()
        {
            Random rand = new Random();
            int N = int.Parse(textBox4.Text);          // Количество генерируемых чисел
            double m = double.Parse(textBox1.Text);    // Мат. ожидание
            double sko = double.Parse(textBox2.Text);  // СКО
            int n = int.Parse(textBox3.Text);          // Число суммируемых равномерно распределённых чисел

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
            distNameLabel.Text = "Гауссовское распределение\r\nm = " + m.ToString() + ", σ = " + sko.ToString() + ", N = " + N.ToString();
        }

        // Экспоненциальное распределение
        private void ExponentialDistribution()
        {
            Random rand = new Random();
            int N = int.Parse(textBox2.Text);          // Количество генерируемых чисел
            double λ = double.Parse(textBox1.Text);    // Параметр экспоненциального распределения

            randArray = new double[N];
            for (int i = 0; i < N; i++)
                randArray[i] = - Math.Log(rand.NextDouble()) / λ;

            CalculateStatValues();
            DrawHistogram();
            distNameLabel.Text = "Экспоненциальное распределение\r\nλ = " + λ.ToString() + ", N = " + N.ToString();
        }

        // Гамма-распределение
        private void GammaDistribution()
        {
            Random rand = new Random();
            int N = int.Parse(textBox3.Text);          // Количество генерируемых чисел
            int η = int.Parse(textBox1.Text);   
            double λ = double.Parse(textBox2.Text);

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
            distNameLabel.Text = "Гамма-распределение\r\nη = " + η.ToString() + ", λ = " + λ.ToString() + ", N = " + N.ToString();
        }

        // Треугольное распределение
        private void TriangleDistribution()
        {
            Random rand = new Random();
            int N = int.Parse(textBox3.Text);
            double a = double.Parse(textBox1.Text);
            double b = double.Parse(textBox2.Text);

            randArray = new double[N];

            for (int i = 0; i < N; i++)
            {
                double R1 = rand.NextDouble();
                double R2 = rand.NextDouble();
                randArray[i] = a + (b - a) * Math.Max(R1, R2);
            }
                

            CalculateStatValues();
            DrawHistogram();
            distNameLabel.Text = "Треугольное распределение\r\na = " + a.ToString() + ", b = " + b.ToString() + ", N = " + N.ToString();
        }

        // Распределение Симпсона
        private void SimpsonDistribution()
        {
            Random rand = new Random();
            int N = int.Parse(textBox3.Text);
            double a = double.Parse(textBox1.Text);
            double b = double.Parse(textBox2.Text);

            randArray = new double[N];

            for (int i = 0; i < N; i++)
                randArray[i] = a/2 + (b/2 - a/2)*rand.NextDouble() + a/2 + (b/2 - a/2)*rand.NextDouble();

            CalculateStatValues();
            DrawHistogram();
            distNameLabel.Text = "Распределение Симпсона\r\na = " + a.ToString() + ", b = " + b.ToString() + ", N = " + N.ToString();
        }


        // Вывод сгенерированных чисел в текстовый файл
        private void show_button_Click(object sender, EventArgs e)
        {
            if (randArray == null) return;
            StreamWriter sw = new StreamWriter("random.txt");
            for (int i = 0; i < randArray.Length; i++)
                sw.WriteLine(randArray[i].ToString(CultureInfo.InvariantCulture));
            sw.Close();

            if (File.Exists("random.txt")) Process.Start("random.txt");
        }

        // Вычисление математического ожидания, дисперсии и СКО
        private void CalculateStatValues()
        {
            double Mx = randArray.Sum() / randArray.Length;
            textBox_Mx.Text = Mx.ToString();

            double Dx = randArray.Sum(t => (t - Mx) * (t - Mx)) / (randArray.Length - 1);
            textBox_Dx.Text = Dx.ToString();

            textBox_sko.Text = (Math.Sqrt(Dx)).ToString();
        }

        // Построить гистограмму
        private void DrawHistogram()
        {
            List<double> numbers = new List<double>(randArray);
            numbers.Sort();

            const int intervalsCount = 20;
            double width = numbers.Last() - numbers.First();

            double widthOfInterval = width / intervalsCount;

            double[] heights = new double[intervalsCount];    // Высота столбцов гистограммы
            double[] X_values = new double[intervalsCount];  // Значение по оси x

            X_values[0] = 0.0245 * width + numbers.First();
            for (int i = 1; i < intervalsCount; i++)
                X_values[i] = X_values[i - 1] + widthOfInterval;

            double xLeft = numbers.First();           // Начало диаграммы по оси x
            double xRight = xLeft + widthOfInterval;  // Конец текущего интервала по оси x
            int j = 0;
            for (int i = 0; i < intervalsCount; i++)
            {
                while (j < numbers.Count && xLeft <= numbers[j] && xRight > numbers[j])
                {
                    heights[i] ++;
                    j++;
                }
                heights[i] /= numbers.Count;
                xLeft = xRight;
                xRight += widthOfInterval;
            }

            // Получим панель для рисования
            GraphPane pane = zedGraphControl1.GraphPane;
            pane.XAxis.Title.Text = "Значение величины";
            pane.YAxis.Title.Text = "Частота попадания в интервал";
            pane.Title.Text = "Гистограмма непрерывного распределения";

            // Очистим список кривых на тот случай, если до этого сигналы уже были нарисованы
            pane.CurveList.Clear();

            BarItem bar = pane.AddBar("", X_values, heights, Color.DarkGreen);
            
            // !!! Расстояния между кластерами (группами столбиков) гистограммы = 0.0
            // У нас в кластере только один столбик.
            pane.BarSettings.MinClusterGap = 0.0f;

            pane.XAxis.Scale.Min = numbers.First();
            pane.XAxis.Scale.Max = numbers.Last();
            pane.XAxis.Scale.AlignH = AlignH.Center;

            // Вызываем метод AxisChange (), чтобы обновить данные об осях. 
            zedGraphControl1.AxisChange();

            // Обновляем график
            zedGraphControl1.Invalidate();
        }
    }
}
