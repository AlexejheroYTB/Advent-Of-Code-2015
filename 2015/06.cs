using System;
using System.Collections.Generic;
using System.IO;

public static class Program
{
    public static int[,] Lights = new int[1000, 1000];
    public static List<Instruction> Instructions = new List<Instruction>();

    public static void Main()
    {
        string[] instructions = File.ReadAllLines("../../data.txt");

        foreach (string instruction in instructions)
        {
            string remaining = "";
            InstructionType instructionType = InstructionType.TurnOff;
            if (instruction.StartsWith("turn off"))
            {
                instructionType = InstructionType.TurnOff;
                remaining = instruction.Substring(9);
            }
            else if (instruction.StartsWith("turn on"))
            {
                instructionType = InstructionType.TurnOn;
                remaining = instruction.Substring(8);
            }
            else if (instruction.StartsWith("toggle"))
            {
                instructionType = InstructionType.Toggle;
                remaining = instruction.Substring(7);
            }

            string fromString = remaining.Split(' ')[0];
            string toString = remaining.Split(' ')[2];

            Position from = new Position(int.Parse(fromString.Split(',')[0]), int.Parse(fromString.Split(',')[1]));
            Position to = new Position(int.Parse(toString.Split(',')[0]), int.Parse(toString.Split(',')[1]));

            Instructions.Add(new Instruction(instructionType, from, to));
        }

        foreach (Instruction instruction in Instructions)
        {
            for (int i = instruction.From.X; i <= instruction.To.X; i++)
            {
                for (int j = instruction.From.Y; j <= instruction.To.Y; j++)
                {
                    switch (instruction.Type)
                    {
                        case InstructionType.TurnOff:
                            Lights[i, j] = Math.Max(0, Lights[i, j] - 1);
                            break;
                        case InstructionType.TurnOn:
                            Lights[i, j]++;
                            break;
                        case InstructionType.Toggle:
                            Lights[i, j] += 2;
                            break;
                    }
                }
            }
        }

        int total = 0;
        for (int i = 0; i <= 999; i++)
        {
            for (int j = 0; j <= 999; j++)
            {
                total += Lights[i, j];
            }
        }

        Console.WriteLine(total);

        Console.Read();
    }

    public class Instruction
    {
        public InstructionType Type;
        public Position From;
        public Position To;

        public Instruction(InstructionType type, Position from, Position to)
        {
            Type = type;
            From = from ?? throw new ArgumentNullException(nameof(from));
            To = to ?? throw new ArgumentNullException(nameof(to));
        }
    }

    public class Position
    {
        public int X;
        public int Y;

        public Position(int x, int y)
        {
            X = x;
            Y = y;
        }
    }

    public enum InstructionType
    {
        TurnOff,
        TurnOn,
        Toggle,
    }
}