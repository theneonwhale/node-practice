import commander from 'commander';
const { Command } = commander;
const program = new Command();
export default program
  .version('0.0.1')
  .requiredOption('-f, --folder <type>', 'input folder')
  .option('-o, --output [type]', 'output folder', './dist')
  .option('-d, --delete', 'delete input folder');
