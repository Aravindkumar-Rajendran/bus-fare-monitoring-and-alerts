from tika import parser
parsed = parser.from_file('extract.pdf')
print(parsed["metadata"])
print(parsed["content"])