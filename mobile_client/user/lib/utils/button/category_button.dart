import 'package:flutter/material.dart';

class CategoryButton extends StatelessWidget {
  final void Function()? onPressed;
  final String text;
  const CategoryButton({super.key, required this.text, this.onPressed});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(6.0),
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(shape: const StadiumBorder()),
        child: Text(text),
      ),
    );
  }
}
