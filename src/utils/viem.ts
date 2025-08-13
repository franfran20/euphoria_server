import {
  SimulateContractParameters,
  WalletClient,
  createPublicClient,
  createWalletClient,
  http,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { morphHolesky } from "viem/chains";
import config from "../config";
import { EUPHORIA_FACTORY_ABI, EUPHORIA_FACTORY_ADDRESS } from "./constants";

const relayerAccount = privateKeyToAccount(config.relayerKey);

const relayerClient: WalletClient = createWalletClient({
  chain: morphHolesky,
  transport: http(),
  account: relayerAccount,
});

const publicClient = createPublicClient({
  chain: morphHolesky,
  transport: http(),
});

const executeContractFunction = async ({
  functionName,
  args,
}: {
  functionName: string;
  args: any[];
}) => {
  const { request, result } = await publicClient.simulateContract({
    address: EUPHORIA_FACTORY_ADDRESS,
    abi: EUPHORIA_FACTORY_ABI,
    functionName,
    args,
  });
  // @ts-ignore
  const hash = await relayerClient.writeContract(request);
  await publicClient.waitForTransactionReceipt({ hash });

  return result;
};

export { relayerClient, publicClient, executeContractFunction };
