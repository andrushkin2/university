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
        LehmerRandom Rand;
        List<double> RandArray;

        public Form1()
        {
            InitializeComponent();
        }

        private void findPeriod()
        {
            RandArray = new List<double>();

       //     RandArray.Add(Rand.Current());
            for (int i = 0; i < 2000000; i++)
                RandArray.Add(Rand.Next());

            double Xv = Rand.Current();

            Rand.Reset();
            int i1 = -1, i2 = -1;
            bool flag =  false;

            // Нахождение периода
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

            // Нахождение длины участка апериодичности
            int i3 = 0;      
            while (RandArray[i3] != RandArray[i3 + period]) 
                i3++; 
            int aperiod = i3 + period;

            RandArray.RemoveRange(aperiod, RandArray.Count - aperiod);
            
            if (i2 == -1 || i1 == -1) textBox_period.Text = "No period";
            else
            {
                textBox_period.Text = period.ToString();        // Период
                textBox_no_period.Text = aperiod.ToString();    // Длина участка апериодичности
            }
        }

        private void calculateStatValues()
        {
            double Mx = 0;
            for (int i = 0; i < RandArray.Count; i++)
                Mx += RandArray[i];
            Mx /= RandArray.Count;
            textBox_Mx.Text = Mx.ToString();

            double Dx = 0;
            for (int i = 0; i < RandArray.Count; i++)
                Dx += (RandArray[i] - Mx) * (RandArray[i] - Mx);
            Dx /= (RandArray.Count - 1);
            textBox_Dx.Text = Dx.ToString();

            textBox_sko.Text = (Math.Sqrt(Dx)).ToString();

        }

        private void checkUniformity()
        {
            int K = 0, N = RandArray.Count;

            for (int i = 0; i < N; i += 2)
            {
                if (i + 1 >= N) break;

                if (RandArray[i] * RandArray[i] + RandArray[i + 1] * RandArray[i + 1] < 1.0)
                    K++;
            }

            textBox_2kn.Text = (2 * (double)K / N).ToString();
        }

        private void drawHistogram()
        {
            int N = RandArray.Count;

            // Получим панель для рисования
            GraphPane pane = zedGraphControl1.GraphPane;

            // Очистим список кривых на тот случай, если до этого сигналы уже были нарисованы
            pane.CurveList.Clear();

            const int partscount = 20;
            const double partLength = 1.0 / partscount;

            double[] frequency = new double[partscount]; // Частота попаданий (высота столбца)
            double[] X_values = new double[partscount];  // Значение по оси x

            X_values[0] = 0.0245;
            for (int i = 1; i < partscount; i++)
                X_values[i] = X_values[i - 1] + 1.0 / partscount;

            for (int i = 0; i < partscount; i++)
            {
                for (int j = 0; j < N; j++)
                {
                    if ((RandArray[j] >= i * partLength) && (RandArray[j] < (i + 1) * partLength))
                        frequency[i] ++;
                }
                frequency[i] /= N;
            }


            BarItem bar = pane.AddBar("Гистограмма", X_values, frequency, Color.DarkGreen);

            // !!! Расстояния между кластерами (группами столбиков) гистограммы = 0.0
            // У нас в кластере только один столбик.
            pane.BarSettings.MinClusterGap = 0.0f;

            pane.XAxis.Scale.Min = 0;
            pane.XAxis.Scale.Max = 1;
            pane.XAxis.Scale.AlignH = AlignH.Center;

            // Вызываем метод AxisChange (), чтобы обновить данные об осях. 
            zedGraphControl1.AxisChange();

            // Обновляем график
            zedGraphControl1.Invalidate();
        }


        private void ArrayToFile()
        {
            StreamWriter sw = new StreamWriter("random.txt");

            for (int i = 0; i < RandArray.Count; i++)
            {
          //      RandArray[i] = RandArray[i] * Rand.getM();
                sw.WriteLine(RandArray[i].ToString());

            }


            sw.Close();
        }

        private void calculateButton_Click(object sender, EventArgs e)
        {
            Rand = new LehmerRandom(ulong.Parse(textBox_a.Text), ulong.Parse(textBox_m.Text), ulong.Parse(textBox_R0.Text));
            findPeriod();

            drawHistogram();

            calculateStatValues();
            checkUniformity();
            
            ArrayToFile();


            RandArray.Clear();
        }

    }
}
