#lang racket

(require rackunit
         "Q3.rkt")
(require rackunit/text-ui)

(define utility-tests
  (test-suite
   "Tests for the utility functions"
   (check-true (contains '(1 2 3 4) 1 ) "contains: item in list -> return true")
   (check-false (contains '(1 2 3 4) 6 ) "contains: item not in list -> return false")

   (check-equal? (remove-while '(1 2 3 4 5) (lambda (num) (< num 3))) '(3 4 5) "remove-while: should remove prefix")
   (check-equal? (remove-while '(1 5 1 5) (lambda (num) (< num 3))) '(5 1 5) "remove-while: should not remove after first false")
   (check-equal? (remove-while '(1 1 1 1 1) (lambda (num) (< num 3))) '() "remove-while: should empty the list")
   ))

(run-tests utility-tests)

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

(define q2-tests
  (test-suite
   "Tests for question 2"
   (check-true (sorted? '() <) "sorted? empty list -> true")
   (check-true (sorted? '(1) <) "sorted? one item list -> true")
   (check-true (sorted? '(1 3 5) <) "sorted? sorted list -> true")
   (check-false (sorted? '(10 1 2 3) <) "sorted? prefix unsorted -> false")
   (check-false (sorted? '(0 10 2 3) <) "sorted? middle unsorted -> false")
   (check-false (sorted? '(1 2 3 -10) <) "sorted? postfix unsorted -> false")
   ))

(run-tests q2-tests)

(define q3-tests
  (test-suite
   "Tests for question 3"
   (check-exn exn:fail? ( lambda ()(merge '(3 2 1) '(3 2 1))) "merge: unordered lists -> exception raised")
   (check-equal? (merge '(1 3 5) '(2 4 6)) '(1 2 3 4 5 6) "merge: zig-zag")
   (check-equal? (merge '(1 3 8) '()) '(1 3 8) "merge: empty list")
   (check-equal? (merge '() '(1 3 8)) '(1 3 8) "merge: empty list")
   (check-equal? (merge '(2 3 4) '(1)) '(1 2 3 4) "merge: different sized lists")
   (check-equal? (merge '(1) '(2 3 4)) '(1 2 3 4) "merge: different sized lists")
   (check-equal? (merge '(1 2 3) '(4 5 6)) '(1 2 3 4 5 6) "merge: straight order")
   (check-equal? (merge '(4 5 6) '(1 2 3)) '(1 2 3 4 5 6) "merge: straight order")
   (check-equal? (merge '(1 3 8) '(1 3 8)) '(1 1 3 3 8 8) "merge: overlapping items")
   ))

(run-tests q3-tests)

(define q4-tests
  (test-suite
   "Tests for question 4"
   (check-equal? (remove-adjacent-duplicates '(1 2 3)) '(1 2 3) "remove-adjacent-duplicates: no duplicated -> same list")
   (check-equal? (remove-adjacent-duplicates '(1 1 2 3)) '(1 2 3) "remove-adjacent-duplicates: prefix duplicate")
   (check-equal? (remove-adjacent-duplicates '(1 2 2 3)) '(1 2 3) "remove-adjacent-duplicates: middle duplicate")
   (check-equal? (remove-adjacent-duplicates '(1 2 3 3)) '(1 2 3) "remove-adjacent-duplicates: postfix duplicate")
   (check-equal? (remove-adjacent-duplicates '(1 1 1 1 2 3)) '(1 2 3) "remove-adjacent-duplicates: sequence larger than 2")
   (check-equal? (remove-adjacent-duplicates '(1 1 2 3 3 4 4 4 4)) '(1 2 3 4) "remove-adjacent-duplicates: mixed case")
   ))

(run-tests q4-tests)