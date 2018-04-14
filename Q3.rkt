#lang racket

(require rackunit)
(require rackunit/text-ui)



; ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Utility Functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

; returns true iff the given collection contains the given item as an element
    ; Signature: contains?(collection,item)
    ; Purpose: To test if collection contains the item
    ; Type: [list, any -> boolean]
    ; Example: (contains '(1 2 3) 3) should produce true
(define contains? (lambda
                   (collection item)
                   (if (empty? collection)
                       #f
                       (if (equal? (car collection) item)
                           #t
                           (contains? (cdr collection) item))
                       )
                   ))


; removes elemets from the collection, until the predicate returns false for an element
    ; Signature: remove-while(collection, predicate)
    ; Purpose: to remove all items from a list until the first item does not satisfy a condition
    ; Type: [list, predicate -> boolean]
    ; Example: (remove-while '(1 2 3 2 1) (lambda (num)(< x 3) should produce '(3 2 1)
(define remove-while (lambda
                         (collection predicate)
                       (if (empty? collection)
                           '()
                           (if (predicate (car collection))
                               (remove-while (cdr collection) predicate)
                               collection
                               )
                           )))

(provide contains? remove-while)

; TESTS

(define utility-tests
  (test-suite
   "Tests for the utility functions"
   (check-true (contains? '(1 2 3 4) 1 ) "contains: item in list -> return true")
   (check-false (contains? '(1 2 3 4) 6 ) "contains: item not in list -> return false")

   (check-equal? (remove-while '(1 2 3 4 5) (lambda (num) (< num 3))) '(3 4 5) "remove-while: should remove prefix")
   (check-equal? (remove-while '(1 5 1 5) (lambda (num) (< num 3))) '(5 1 5) "remove-while: should not remove after first false")
   (check-equal? (remove-while '(1 1 1 1 1) (lambda (num) (< num 3))) '() "remove-while: should empty the list")
   ))

(run-tests utility-tests)


; ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Question 1 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
(define vowels '(a e i o u))
(define vowel? (lambda(char)(contains? vowels char)))

; removes vowels from a string's prefix, until the first occurence of a non-vowel. ex: 'uabba' -> 'bba', 'faa' -> 'faa'
(define skip-vowel-prefix (lambda
                             (word)
                            (remove-while word (lambda (char)(vowel? char)))
                            ))


; returns the amount of syllables in the given string. Adjacent elements are counted as one
    ; Signature: count-syllables(word)
    ; Type: [list of chars -> num]
    ; Example: (contains '(a i e b b a)) should produce 2
(define count-syllables (lambda
                          (word)
                          (if (empty? word)
                              0
                              (if (vowel? (car word))
                              (+ (count-syllables(skip-vowel-prefix word)) 1)
                              (count-syllables(cdr word))
                                        ))
                          ))
(provide count-syllables)

; TESTS

(define q1-tests
  (test-suite
   "Tests for question 1"
   (check-equal? (count-syllables '()) 0 "count-syllables: empty word -> 0")
   (check-equal? (count-syllables '(b b b)) 0 "count-syllables: no syllables -> 0")
   (check-equal? (count-syllables '(a b b)) 1 "count-syllables: syllabel in prefix  -> 1")
   (check-equal? (count-syllables '(b a b)) 1 "count-syllables: syllabel in word -> 1")
   (check-equal? (count-syllables '(b b a)) 1 "count-syllables: syllabel in postfix -> 1")
   (check-equal? (count-syllables '(a e i o u b b)) 1 "count-syllables: group of syllables should be counted as one -> 1")
   (check-equal? (count-syllables '(a b e u b i b u u u u)) 4 "count-syllables: mixed case -> 4")
   ))

(run-tests q1-tests)

; ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Question 2 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    ; Signature: sorted?(outer,inner)
    ; Purpose: To check wether a list is sorted according to a given comparator
    ; Type: [list, function -> boolean]
    ; Example: (sorted? 5'(1 2 3 <) should produce true
;              (sorted? 5'(1 5 3 <) should produce false
    ; Post-conditions: false if there exists 2 adjecent elements so that the given comparator
; thinks that the first one is "larger" (according to the comparator's specific order) than the second.
; Note that for empty lists/ lists containing a single element, that condition is never met (and therfore they are considered sorted)
(
define sorted? (lambda
                    (collection comparator)
                  ; If the list is of size 0 or 1, it is ordered (as there are no 2 elements who break the order)
                  (if (or (empty? collection) (empty? (cdr collection))) 
                      #t
                      (if (comparator (car collection) (cadr collection))
                          (sorted? (cdr collection) comparator)
                          #f
                  ))))
(provide sorted?)

; TESTS
(define q2-tests
  (test-suite
   "Tests for question 2"
   (check-true (sorted? '() <) "sorted? empty list -> true")
   (check-true (sorted? '(1) <) "sorted? one item list -> true")
   (check-true (sorted? '(5 3) >) "sorted? sorted list -> true")
   (check-true (sorted? '(1 3 5) <) "sorted? sorted list -> true")
   (check-false (sorted? '(10 1 2 3) <) "sorted? prefix unsorted -> false")
   (check-false (sorted? '(0 10 2 3) <) "sorted? middle unsorted -> false")
   (check-false (sorted? '(1 2 3 -10) <) "sorted? postfix unsorted -> false")
   ))

(run-tests q2-tests)

; ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Question 3 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


; This is a helper method, it merges the two lists assuming that they are sorted.
(define merge-helper (lambda (list1 list2)
                 (if (empty? list1)
                     list2
                 (if (empty? list2)
                     list1
                 (if (< (car list1) (car list2))
                      (cons (car list1) (merge-helper (cdr list1) list2))
                      (cons (car list2) (merge-helper list1 (cdr list2)))
                      )))))

    ; Signature: merge(list1,list2)
    ; Purpose: To merge two ordered (ascending) lists into a single ordered list
    ; Type: [list of numbers, list of numbers -> list of numbers]
    ; Example: (merge '(1 3 5) '(2 4 6) ) should produce '(1 2 3 4 5 6)
    ; Pre-conditions: both lists are ordered (ascending); otherwise - an exception will be raised
    ; both lists are numerical
    ; Post-condition: result = a new (ordered) list containing all elements of the input lists
(define merge (lambda
                  (list1 list2)
                (if (not (and (sorted? list1 <) (sorted? list2 <)))
                    (raise (make-exn:fail "unordered input lists" (current-continuation-marks)))
                (merge-helper list1 list2)
                )))

(provide merge)

(define q3-tests
  (test-suite
   "Tests for question 3"
   (check-exn exn:fail? ( lambda ()(merge '(3 2 1) '(1 2 3))) "merge: unordered lists -> exception raised")
   (check-exn exn:fail? ( lambda ()(merge '(1 2 3) '(3 2 1))) "merge: unordered lists -> exception raised")
   (check-exn exn:fail? ( lambda ()(merge '(3 2 1) '(3 2 1))) "merge: unordered lists -> exception raised")
   (check-equal? (merge '(1 3 5) '(2 4 6)) '(1 2 3 4 5 6) "merge: zig-zag")
   (check-equal? (merge '(1 3 8) '()) '(1 3 8) "merge: empty list")
   (check-equal? (merge '() '(1 3 8)) '(1 3 8) "merge: empty list")
   (check-equal? (merge '() '()) '() "merge: empty list")
   (check-equal? (merge '(2 3 4) '(1)) '(1 2 3 4) "merge: different sized lists")
   (check-equal? (merge '(1) '(2 3 4)) '(1 2 3 4) "merge: different sized lists")
   (check-equal? (merge '(1 2 3) '(4 5 6)) '(1 2 3 4 5 6) "merge: straight order")
   (check-equal? (merge '(4 5 6) '(1 2 3)) '(1 2 3 4 5 6) "merge: straight order")
   (check-equal? (merge '(1 3 8) '(1 3 8)) '(1 1 3 3 8 8) "merge: overlapping items")
   ))

(run-tests q3-tests)

; ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Question 4 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    ; Signature: remove-adjacent-duplicates(list)
    ; Purpose: To remove adjacent duplicates from a list
    ; Type: [list -> list]
    ; Example: (merge '(1 1 2 2 2 3 1 2 3)) should produce '(1 2 3 1 2 3)
(define remove-adjacent-duplicates (lambda
                                       (list)
                                     (if (empty? list)
                                         '()
                                      (if (empty? (cdr list))
                                          list
                                         (let ([list-unsequenced (remove-adjacent-duplicates (cdr list))])
                                               (if (equal? (car list) (car list-unsequenced))
                                                   list-unsequenced
                                                   (cons (car list) list-unsequenced)
                                                   )))
                                         )))

(provide remove-adjacent-duplicates)

; TESTS
(define q4-tests
  (test-suite
   "Tests for question 4"
   (check-equal? (remove-adjacent-duplicates '()) '() "remove-adjacent-duplicates: empty list -> empty list")
   (check-equal? (remove-adjacent-duplicates '(1 2 3)) '(1 2 3) "remove-adjacent-duplicates: no duplicated -> same list")
   (check-equal? (remove-adjacent-duplicates '(1 1 2 3)) '(1 2 3) "remove-adjacent-duplicates: prefix duplicate")
   (check-equal? (remove-adjacent-duplicates '(1 2 2 3)) '(1 2 3) "remove-adjacent-duplicates: middle duplicate")
   (check-equal? (remove-adjacent-duplicates '(1 2 3 3)) '(1 2 3) "remove-adjacent-duplicates: postfix duplicate")
   (check-equal? (remove-adjacent-duplicates '(1 1 1 1 2 3)) '(1 2 3) "remove-adjacent-duplicates: sequence larger than 2")
   (check-equal? (remove-adjacent-duplicates '(1 1 2 3 3 4 4 4 4)) '(1 2 3 4) "remove-adjacent-duplicates: mixed case")
   (check-equal? (remove-adjacent-duplicates '(yeah yeah yeah)) '(yeah) "remove-adjacent-duplicates: strings")
   ))

(run-tests q4-tests)

