#Email
expect("one@two.xyz").to look_like("email")
expect("one@two.xyz").to look_like("a@b.com")

#Amount and Currency
expect("$53,23,1").to look_like("$amount")
expect("₹23,1.00").to look_like("₹amount")

expect("$53,23,1").to look_like("$12.21")
expect("₹23,1.00").to look_like("₹100.12")

#Enums
expect("one").to look_like("one/two/three")
expect("four").not_to look_like("one/two/three")

#Regex
expect("i have  test").to look_like("/test/")
expect("i have  tess").not_to look_like("/test/")

#URL
expect("google.com").to look_like("http://google.com")
expect("http://google.com").to look_like("http://google.com")
expect("google-com").not_to look_like("http://google.com")

#Wildcard
expect("").to look_like("email*")
expect("not.an.email").not_to look_like("email*")
expect("one@two.xyz").to look_like("email*")

expect("one@two.xyz").to look_like("a@b.com*")

expect("").to look_like("*")
expect("any-thing").to look_like("*")

#Numbers
expect("5000").to look_like("number")
expect("5,000").to look_like("number")
expect("5,43.11").to look_like("number")

expect("6993").to look_like("5000")
expect("5000").to look_like("5,000")
expect("$5000").not_to look_like("5000")