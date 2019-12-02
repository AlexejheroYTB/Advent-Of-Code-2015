using System;
using System.Collections.Generic;
using System.IO;

public static class Program
{
    public static Dictionary<string, short> Wires = new Dictionary<string, short>();

    public static void Main()
    {
        string[] operations = File.ReadAllLines("../../data.txt");

        foreach (string op in operations)
        {
            Operation operation = new Operation(op);

            switch (operation.Operator)
            {
                case Operator.Assign:
                    Wires.Set(operation.Output, Wires.GetOrDefault(operation.Input1));
                    break;
                case Operator.Assign_BIT:
                    Wires.Set(operation.Output, short.Parse(operation.Input1));
                    break;
                case Operator.NOT:
                    Wires.Set(operation.Output, short.Parse((~Wires.GetOrDefault(operation.Input1)).ToString()));
                    break;
                case Operator.AND:
                    Wires.Set(operation.Output, short.Parse((Wires.GetOrDefault(operation.Input1) & Wires.GetOrDefault(operation.Input2)).ToString()));
                    break;
                case Operator.AND_BIT:
                    Wires.Set(operation.Output, short.Parse((short.Parse(operation.Input1) & Wires.GetOrDefault(operation.Input2)).ToString()));
                    break;
                case Operator.OR:
                    Wires.Set(operation.Output, short.Parse((Wires.GetOrDefault(operation.Input1) | Wires.GetOrDefault(operation.Input2)).ToString()));
                    break;
                case Operator.LSHIFT:
                    Wires.Set(operation.Output, short.Parse((Wires.GetOrDefault(operation.Input1) << short.Parse(operation.Input2)).ToString()));
                    break;
                case Operator.RSHIFT:
                    Wires.Set(operation.Output, short.Parse((Wires.GetOrDefault(operation.Input1) >> short.Parse(operation.Input2)).ToString()));
                    break;
            }
        }

        Console.WriteLine(Wires.GetOrDefault("a"));

        Console.Read();
    }

    public static void Set(this Dictionary<string, short> dictionary, string key, short value)
    {
        dictionary.Remove(key);
        dictionary.Add(key, value);
    }

    public static short GetOrDefault(this Dictionary<string, short> dictionary, string key)
    {
        if (dictionary.TryGetValue(key, out short value)) return value;
        else return 0;
    }

    public class Operation
    {
        public Operator Operator = Operator.Assign;
        public string Input1 = "";
        public string Input2 = "";
        public string Output = "";

        public Operation(string op)
        {
            Output = op.Split(new string[] { " -> " }, StringSplitOptions.RemoveEmptyEntries)[1];

            string left = op.Split(new string[] { " -> " }, StringSplitOptions.RemoveEmptyEntries)[0];

            switch(left.Split(' ').Length)
            {
                case 1:
                    Input1 = left;
                    if (short.TryParse(Input1, out _)) Operator = Operator.Assign_BIT;
                    else Operator = Operator.Assign;
                    break;
                case 2:
                    Operator = Operator.NOT;
                    Input2 = left.Split(' ')[1];
                    break;
                case 3:
                    Input1 = left.Split(' ')[0];
                    Input2 = left.Split(' ')[2];
                    switch(left.Split(' ')[1])
                    {
                        case "AND":
                            if (short.TryParse(Input1, out _)) Operator = Operator.AND_BIT;
                            else Operator = Operator.AND;
                            break;
                        case "OR":
                            Operator = Operator.OR;
                            break;
                        case "LSHIFT":
                            Operator = Operator.LSHIFT;
                            break;
                        case "RSHIFT":
                            Operator = Operator.RSHIFT;
                            break;
                    }
                    break;
            }
        }
    }

    public enum Operator
    {
        Assign,
        Assign_BIT,
        NOT,
        AND,
        AND_BIT,
        OR,
        LSHIFT,
        RSHIFT
    }
}