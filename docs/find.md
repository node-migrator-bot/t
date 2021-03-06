# Find

__The power of ntask´s find-command is what really makes ntask shine. Find any
given task in a matter of seconds and even where to start coding it.__


***


### @Assignee

The "@"-symbol is for assignee. Prefix your name with "@" and you'll get a list
of tasks sorted by date-added, that you are suppose to do.

    t find "@$(whoami)"

Tasks that are not assigned to anyone specific will land under the assignee
@none. This means you can easily manage a taskpool by just querying:

    t find "@none"

You can also use the alias @unassigned


***


### Labels

Labels come in two forms. The keyword that the task was prefixed with
(TODO | OPTIMIZE | BUG | FIXME) and words starting with a hash-symbol. The
latter can also have brackets that store a numeric value. This numeric value
can be filtered and sorted upon.

    t find "#pri[>3]*"

In the example above I have suffixed the label with an asterix, that selects
the label for sorting. This is usefull in conjunction with the --reverse flag
for ascending sorts. You can also see that there is filtering being done here
using brackets, so "pri"-labels with a numeric value of less than three will
not be displayed.

    t find "#pri[3]"

This would effectively be the same as querying #pri[==3]



***

### Options


    -f, --format [string]

    The format-string is a sprintf-like implementation of all the properties of a task.

    %A - Assignee
    %B - Body
    %H - Label (#hash)
    %I - Id
    %K - Keyword
    %L - Line
    %T - Title


    -r, --reverse

    The reverse-option will reverse the pool of your find query. The "*"-suffix
    of a label will select the label for sorting.
