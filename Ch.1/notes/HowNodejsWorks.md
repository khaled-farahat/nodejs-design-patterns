# How Nodejs Works

## I/O is slow

I/O(Input/Output) operations: reading/writing to disk are slow compared to ram operations.

## Blocking I/O

Blocking I/O operations block the execution of the program until the operation is completed.

so server can't do anything else while waiting for the I/O operation to complete.

can be solved using multi-threading, each thread can handle a single request.

## Non-blocking I/O

non-blocking I/O. In this operating mode, the system call always returns immediately without waiting for the data to be read or written.

If no results are available at the moment of the call, the function will simply return a predefined constant, indicating that there is no data available to return at that moment.

the most pattern deal with non-blocking I/O is to actively poll the resource (check the availability) within a loop until some actual data is returned. this is called busy-waiting.

example of non-blocking I/O code:

```js
resources = [socketA, socketB, fileA];
while (!resources.isEmpty()) {
  for (resource of resources) {
    // try to read
    data = resource.read();
    if (data === NO_DATA_AVAILABLE) {
      // there is no data to read at the moment
      continue;
    }
    if (data === RESOURCE_CLOSED) {
      // the resource was closed, remove it from the list
      resources.remove(i);
    } else {
      //some data was received, process it
      consumeData(data);
    }
  }
}
```

As you can see, with this simple technique, it is possible to handle different resources in the same thread, but it's still not efficient. In fact, in the preceding example, the loop will only consume precious CPU for iterating over resources that are unavailable most of the time. Polling algorithms usually result in a huge amount of wasted CPU time

## Event demultiplexing

synchronous event demultiplexer (also known as the event notification interface).

the synchronous event demultiplexer works by watching multiple resources and blocking until one of them is ready to be read or written by returning an event object.

example of event demultiplexer code:

```js
watchedList.add(socketA, FOR_READ);
watchedList.add(fileB, FOR_READ);
while ((events = demultiplexer.watch(watchedList))) {
  // event loop
  for (event of events) {
    // This read will never block and will always return data
    data = event.resource.read();
    if (data === RESOURCE_CLOSED) {
      // the resource was closed, remove it from the watched list
      demultiplexer.unwatch(event.resource);
    } else {
      // some actual data was received, process it
      consumeData(data);
    }
  }
}
```

with this pattern, we can now handle several I/O operations inside a single thread, without using the busy-waiting technique.

having a single thread also has a beneficial impact on the way programmers approach concurrency in general. Throughout the book, you will see how the absence of in-process race conditions and multiple threads to synchronize allows us to use much simpler concurrency strategies.
