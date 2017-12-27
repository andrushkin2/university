using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Lab3
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private double[] CalcValues(double p1, double p2, int n)
        {
            int input = 0,
                output = 0,
                l = 0,
                w = 0;
            string state = "2000";
            Dictionary<string, int> states = new Dictionary<string, int>();
            void calcState(double randP1, double randP2) {
               if (state[2] == '1' && randP1 > p1) {
                    state = getNewState(state, 0, 2);
                    output++;
               }
               if (state[3] == '1' && randP2 > p2) {
                    state = getNewState(state, 0, 3);
                    output++;
               }
               if (state[1] == '1' && (state[2] == '0' || state[3] == '0'))
                {
                    if (state[2] =='0')
                    {
                        int j = Convert.ToInt32(state[1]);
                        if (j - 1 >= 0)
                        {
                            state = getNewState(state, j - 1, 1);
                            state = getNewState(state, 1, 2);
                        }
                    } else if (state[3] == '0')
                    {
                        int j = Convert.ToInt32(state[1]);
                        if (j - 1 >= 0)
                        {
                            state = getNewState(state, j - 1, 1);
                            state = getNewState(state, 1, 3);
                        }
                    }
                }
            };

            states.Add(state, 0);

            for (int i = 0; i < n; i++)
            {
                Double randP1 = getRandom(),
                       randP2 = getRandom();
                switch(state[0])
                {
                    case '1':
                        calcState(randP1, randP2);
                        if (state.Equals("1111"))
                        {

                        } else
                        {
                            int j = Convert.ToInt32(state[1]);
                            if (j + 1 < 2)
                            {
                                j += 1;
                                state = getNewState(state, j, 1);
                                if (j - 1 >= 0 && state[2] == '0')
                                {
                                    j -= 1;
                                    state = getNewState(state, j, 1);
                                    state = getNewState(state, 1, 2);
                                }
                                if (j - 1 >= 0 && state[3] == '0')
                                {
                                    j -= 1;
                                    state = getNewState(state, j, 1);
                                    state = getNewState(state, 1, 3);
                                }
                            }
                            input++;
                        }
                        state = getNewState(state, 2, 0);
                        break;
                    case '2':
                        calcState(randP1, randP2);
                        state = getNewState(state, 1, 0);
                        break;
                    default:
                        break;
                }
                int jTemp = Convert.ToInt32(state[1]);
                w += jTemp;
                updateState(states, state);
                l += Convert.ToInt32(state[1]) > 0 ? 1 : 0;
            }

            return new double[]{ output / n, l / n, w / output };
        }
        private string getNewState(string state, int newValue, int valueIndex)
        {
            var arrString = state.ToCharArray();
            arrString[valueIndex] = newValue.ToString().ToCharArray()[0];
            return new string(arrString);
        }
        private void updateState(Dictionary<string, int> states, string key)
        {
            int value;
            if (states.TryGetValue(key, out value) == true)
            {
                states.Remove(key);
                states.Add(key, value + 1);
            } else {
                states.Add(key, 1);
            }
        }
        private double getRandom()
        {
            Random rand = new Random();
            return rand.NextDouble();
        }

        private void run_Click(object sender, EventArgs e)
        {
            var res = CalcValues(Double.Parse(p1.Text), Double.Parse(p2.Text), Int32.Parse(n.Text));
            a.Text = res[0].ToString();
            l.Text = res[1].ToString();
            w.Text = res[3].ToString();
        }
    }
}
