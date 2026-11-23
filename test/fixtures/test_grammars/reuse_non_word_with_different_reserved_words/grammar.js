export default grammar({
    name: 'reuse_non_word_with_different_reserved_words',

    extras: $ => [/\s/, $._never],
    externals: $ => [$._never],
    word: $ => $.identifier,

    reserved: {
        global: _ => ['if'],
        none: _ => [],
    },

    rules: {
        source_file: $ => choice(
            seq('if', repeat1(choice($.item, $.identifier))),
            seq('#', repeat1(choice($.item, reserved('none', $.identifier)))),
        ),
        item: _ => seq('[', ']'),
        identifier: _ => /[a-z]+/,
    },
});
