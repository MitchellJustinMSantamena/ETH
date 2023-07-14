Santamena

The following code is an example of a "MyToken" smart contract created in the Solidity programming language, which is used to create smart contracts on the Ethereum network. A unique token with the name "Santamena" and the symbol "frday" is defined in the contract.

Description

The offered Solidity application is a rudimentary implementation of the "MyToken" token contract, which permits the creation and administration of a unique Ethereum blockchain token called "Santamena" (abbreviated as "frday").

Getting Started

Executing program

Launch the online Remix Ethereum IDE on your browser. Visit https://remix.ethereum.org to access it.

By selecting the "+" icon in the Remix file explorer on the left side of the screen, a new Solidity file can be created.

The provided Solidity code should be copied and pasted into the Remix file that was just created.

contract MyToken {

    string public tokenName = "Santamena";
    string public tokenAbbrv = "frday";
    uint public totalSupply = 0;

    mapping(address => uint) public balances;


    function mint (address _address, uint _value) public {
        totalSupply += _value;
        balances[_address] += _value;
    
    }

    function burn (address _address, uint _value) public {
        if (balances[_address] >= _value) {
            totalSupply -= _value;
            balances[_address] -= _value;
        }
    }

}
On the Remix interface, confirm that Solidity Compiler is selected. By selecting a version that is compatible with your code from the "Compiler" tab on the right-hand panel, you can choose the correct compiler for your project.

By selecting the "Compile" button from the Remix interface, compile the contract. The right-hand panel ought to display the compiler output, together with any problems or warnings that might have been generated.

In the right-hand panel, select the "Deploy & Run Transactions" tab when the contract has been successfully compiled.

To deploy the contract to the chosen environment, click the "Deploy" button. By doing this, a blockchain instance of the contract will be created.

You can view the deployed contract details in the right-hand panel after the contract has been deployed. By using the contract's functions and viewing its state variables, you may interact with it.

Enter the necessary arguments (such as _address and _value) and then click the correct button to run functions like mint and burn.

Authors

Mitchell Justin M. Santamena

@mjsantamena

License
This project is licensed under the MIT License - see the LICENSE.md file for details
