cmd = torch.CmdLine()
cmd:option('-input', '', 'torch files containing states to be processed')
cmd:option('-output', '', 'json filename to output')

function main() 
   opt = cmd:parse(arg)      
   local f = io.open(opt.output, 'w')
   local states = torch.load(opt.input)
   print(states)
   f:write('{\"states\": [\n')
   for i = 1, #states do
      --print(states[i])
      f:write('[')
      for row = 1, states[i]:size(1) do
         f:write('[')
         for col = 1, states[i]:size(2) do
            f:write(states[i][row][col])
            if col < states[i]:size(2) then f:write(', ') end
         end
         f:write(']')
         if row < states[i]:size(1) then f:write(',\n') end
      end
      f:write(']')
      if i < #states then f:write(',') end
      f:write('\n')
   end
   f:write(']}')
   f:close()
   print(f)
end

main()
