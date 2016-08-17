require "csvigo"

cmd = torch.CmdLine()
cmd:option('-input', '', 'input t7 file')
cmd:option('-output', '', 'output csv file')

function main()
   opt = cmd:parse(arg)

   print("opt", opt)
   -- 2D input tensor
   tensor = torch.load(opt.input)
   print(tensor)   
   -- write out as csv file
   f = io.open(opt.output, 'w')
   for col = 1, tensor:size(2) do  
      f:write("col" .. col)
      if col < tensor:size(2) then
         f:write(",")
      else
         f:write("\n")
      end
   end
   for i = 1, tensor:size(1) do
      for j = 1, tensor:size(2) do
         f:write(tensor[i][j])
         if j < tensor:size(2) then
            f:write(",")
         else
            f:write("\n")
         end
      end
   end
   f:close()
end

main()
