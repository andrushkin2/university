using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace lab3Hook
{
    class hookManager
    {
        private List<hookClass> hooks;
        public hookManager()
        {
            hooks = new List<hookClass>();
        }
        public hookClass getHookByCode(int code)
        {
            if (code >= 0)
            {
                foreach (hookClass hook in hooks)
                {
                    if (hook.keyCode == code)
                    {
                        return hook;
                    }
                }
            }
            return new hookClass();
        }
        public bool isHookWithCodeExist(int keyCode)
        {
            if (keyCode >= 0)
            {
                IEnumerable<int> codes = from hookClass in hooks select hookClass.keyCode;
                foreach(int code in codes)
                {
                    if (code == keyCode)
                    {
                        return true;
                    }
                }
            }
            return false;
        }
        public bool isHookGood(hookClass hook)
        {
            if (hook.isClassEmpty() || hook.key.Length != 1 || !(hook.keyCode >= 0 && hook.keyCode <= 249))
            {
                return false;
            }
            return true;
        }
        public bool addNewHook(hookClass hook)
        {
            if (isHookGood(hook) && !isHookWithCodeExist(hook.keyCode))
            {
                hooks.Add(hook);
                return true;
            }
            return false;
        }
        public hookClass getHookByIndex(int index)
        {
            if (index < hooks.Count)
            {
                return hooks.ElementAt(index);
            }
            return new hookClass();
        }
        public bool removeHookWithCode(int code)
        {
            if (isHookWithCodeExist(code))
            {
                hooks.Remove(getHookByCode(code));
                return true;
            }
            return false;
        }
        public IList<hookClass> getHooksList()
        {
            return hooks;
        }
        public void clearHooks()
        {
            hooks.Clear();
        }
    }
}
