# The Node Philosophy

## Small Core

Node provides the minimum functionalities leave the rest to  the so-called userland (or userspace) allowing the community to build on top of it.

## Small Modules

the concept of "Make each program do one thing well." which each module is concise and focused on a single task. allowing to apply the DRY(Don't Repeat Yourself) principle.

using package manger as `npm` or `yarn` allows to install and use modules easily. without the conflict of dependencies.

every module is a separate project with its own repository and versioning.

## Small Surface Area

Node.js modules is exposing a minimal set of functionalities to the outside world.

each module provide minimum set of APIs to do its job, which make it clearer to use and less susceptible to erroneous usage.

modules are made to be used not to be extended. So,it has the advantage of reducing use cases, simplifying implementation, facilitating maintenance, and increasing usability.

## Simplicity and Pragmatism

> Keep it simple, stupid.

Simple implementation and interface.

Designing simple, as opposed to perfect, fully featured software is a good practice for several reasons: it takes less effort to implement, it allows shipping faster with fewer resources, it's easier to adapt, and finally, it's easier to maintain and understand.
