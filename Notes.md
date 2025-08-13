- reload abi
- relaod address

- cors
- helmet

# Project Flow & Sections

- Authentication
- Gasless Executions
- Book & Chapter Handlings

```javascript
// Step 1: Simulate transaction
const { request, result: bookId } = await publicClient.simulateContract({
  address: CONTRACT_ADDRESS,
  abi,
  functionName: "createBook",
  args: [title, content],
  account,
});

// Step 2: Send transaction
const hash = await walletClient.writeContract(request);

// Step 3: Wait for confirmation
await publicClient.waitForTransactionReceipt({ hash });

// Step 4: Read back the book using bookId
const bookOnChain = await publicClient.readContract({
  address: CONTRACT_ADDRESS,
  abi,
  functionName: "getBook",
  args: [bookId],
});

// Step 5: Save in MongoDB
await BookModel.create({
  bookId: Number(bookId),
  title: bookOnChain.title,
  content: bookOnChain.content,
  creator: bookOnChain.creator,
  timestamp: Number(bookOnChain.timestamp),
});


// catching error

catch (err: any) {
    console.error("Create book failed:", err);

    // 5. Graceful error handling
    if (err.name === "ContractFunctionRevertedError") {
      return res.status(400).json({ error: "Transaction reverted: " + err.shortMessage });
    }

    return res.status(500).json({ error: "Something went wrong", details: err.message });
  }
```
