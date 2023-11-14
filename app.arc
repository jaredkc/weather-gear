@app
weather-gear-ad92

@aws
runtime nodejs18.x
timeout 15
# concurrency 1
# memory 1152
# profile default
# region us-west-1

@http
/*
  method any
  src server

@plugins
plugin-remix
  src plugin-remix.js

@static

@tables
user
  pk *String

password
  pk *String # userId

note
  pk *String  # userId
  sk **String # noteId
