var parser, valueType,
    relLengthRegExp = /^([+-]?[0-9]+|[+-]?[0-9]*\.[0-9]+)(em|ex|ch|rem|vw|vh|vmin|%)$/i,
    absLengthRegExp = /^([+-]?[0-9]+|[+-]?[0-9]*\.[0-9]+)(cm|mm|in|pt|pc|px)$/i,
    numRegExp = /^[+-]?[0-9]+|[+-]?[0-9]*\.[0-9]+$/;

valueType = {
    'Invalid': 0,
    'RelativeLength': 1,
    'AbsoluteLength': 2,
    'Number': 3,
    'Color': 4,
    'None': 5,
    'Normal': 6,
    'Auto': 7,
    'Inherit': 8,
    'BorderWidthKeyword': 9, // thin | medium | thick
    'BorderStyleKeyword': 10, // none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset
    'FontFamily': 11,
    'FontWeightKeyword': 12,
    'FontStretchKeyword': 13,
    'FontStyleKeyword': 14,
    'FontSizeKeyword': 15,
    'FontSynthesisKeyword': 16,
    'FontVariantKeyword': 17,
    'FontKeyword': 18,
    'LineHeightKeyword': 19
};

parser = {
    'width': function(value) {
        // http://www.w3.org/TR/CSS2/visudet.html#the-width-property
        value = value.trim();
        
        // Negative value is illegal.
        if (/^-/.test(value)) {
            return {"type": valueType.Invalid, "value": value};
        }
        if (relLengthRegExp.test(value)) {
            return {"type": valueType.RelativeLength, "value": value};
        } else if (absLengthRegExp.test(value) || value == '0') {
            return {"type": valueType.AbsoluteLength, "value": value};
        } else if (value.toLowerCase() == 'auto') {
            return {"type": valueType.Auto, "value": value};
        } else if (value.toLowerCase() == 'inherit') {
            return {"type": valueType.Inherit, "value": value};
        } else {
            return {"type": valueType.Invalid, "value": value};
        }
    },
    'min-width': function(value) {
        // http://www.w3.org/TR/CSS2/visudet.html#min-max-widths
        value = value.trim();
        
        // Negative value is illegal.
        if (/^-/.test(value)) {
            return {"type": valueType.Invalid, "value": value};
        }
        if (relLengthRegExp.test(value)) {
            return {"type": valueType.RelativeLength, "value": value};
        } else if (absLengthRegExp.test(value) || value == '0') {
            return {"type": valueType.AbsoluteLength, "value": value};
        } else if (value.toLowerCase() == 'inherit') {
            return {"type": valueType.Inherit, "value": value};
        } else {
            return {"type": valueType.Invalid, "value": value};
        }
    },
    'max-width': function(value) {
        // http://www.w3.org/TR/CSS2/visudet.html#min-max-widths
        value = value.trim();
        
        // Negative value is illegal.
        if (/^-/.test(value)) {
            return {"type": valueType.Invalid, "value": value};
        }
        if (relLengthRegExp.test(value)) {
            return {"type": valueType.RelativeLength, "value": value};
        } else if (absLengthRegExp.test(value) || value == '0') {
            return {"type": valueType.AbsoluteLength, "value": value};
        } else if (value.toLowerCase() == 'none') {
            return {"type": valueType.None, "value": value};
        } else if (value.toLowerCase() == 'inherit') {
            return {"type": valueType.Inherit, "value": value};
        } else {
            return {"type": valueType.Invalid, "value": value};
        }
    },
    'height': function(value) {
        // http://www.w3.org/TR/CSS2/visudet.html#the-height-property
        // the same as 'width'
    },
    'min-height': function(value) {
        // http://www.w3.org/TR/CSS2/visudet.html#min-max-heights
        // the same as 'min-width'
    },
    'max-height': function(value) {
        // http://www.w3.org/TR/CSS2/visudet.html#min-max-heights
        // the same as 'max-width'
    },
    'line-height': function(value) {
        // http://www.w3.org/TR/CSS2/visudet.html#line-height
        value = value.trim();
        
        // Negative value is illegal.
        if (/^-/.test(value)) {
            return {"type": valueType.Invalid, "value": value};
        }
        if (relLengthRegExp.test(value)) {
            return {"type": valueType.RelativeLength, "value": value};
        } else if (absLengthRegExp.test(value) || value == '0') {
            return {"type": valueType.AbsoluteLength, "value": value};
        } else if (value.toLowerCase() == 'none') {
            return {"type": valueType.None, "value": value};
        } else if (value.toLowerCase() == 'inherit') {
            return {"type": valueType.Inherit, "value": value};
        } else {
            return {"type": valueType.Invalid, "value": value};
        }
    },
    'margin': function(value) {
        // http://www.w3.org/TR/CSS2/box.html#margin-properties
        var inheritValue = {"type": valueType.Inherit, "value": value},
            topValue, rightValue, bottomValue, leftValue, values;
        value = value.trim();
        
        if (value.toLowerCase() == 'inherit') {
            return {'top': inheritValue, 'right': inheritValue, 'bottom': inheritValue, 'left': inheritValue};
        } else {
            values = value.split(/\s+/);
            switch(values.length) {
            case 1:
                topValue = leftValue = bottomValue = rightValue = getMarginValue(values[0]);
                break;
            case 2:
                topValue = bottomValue = getMarginValue(values[0]);
                leftValue = rightValue = getMarginValue(values[1]);
                break;
            case 3:
                topValue = getMarginValue(values[0]);
                leftValue = rightValue = getMarginValue(values[1]);
                bottomValue = getMarginValue(values[2]);
            case 4:
                topValue = getMarginValue(values[0]);
                rightValue = getMarginValue(values[1]);
                bottomValue = getMarginValue(values[2]);
                leftValue = getMarginValue(values[3]);
                break;
            default:
                topValue = leftValue = bottomValue = rightValue = {"type": valueType.Invalid, "value": value};
            }
        }
        
        return {'top': topValue, 'right': rightValue, 'bottom': bottomValue, 'left': leftValue};
        
        function getMarginValue(v) {
            if (relLengthRegExp.test(v)) {
                return {"type": valueType.RelativeLength, "value": v};
            } else if (absLengthRegExp.test(v) || value == '0') {
                return {"type": valueType.AbsoluteLength, "value": v};
            } else if (v.toLowerCase() == 'auto') {
                return {"type": valueType.Auto, "value": v};
            } else {
                return {"type": valueType.Invalid, "value": v};
            }
        }
    },
    'margin-left': function(value) {
        // http://www.w3.org/TR/CSS2/box.html#margin-properties
        value = value.trim();
        if (relLengthRegExp.test(value)) {
            return {"type": valueType.RelativeLength, "value": value};
        } else if (absLengthRegExp.test(value) || value == '0') {
            return {"type": valueType.AbsoluteLength, "value": value};
        } else if (value.toLowerCase() == 'auto') {
            return {"type": valueType.Auto, "value": value};
        } else if (value.toLowerCase() == 'inherit') {
            return {"type": valueType.Inherit, "value": value};
        } else {
            return {"type": valueType.Invalid, "value": value};
        }
    },
    'margin-right': function(value) {
        // the same as margin-left
    },
    'margin-top': function(value) {
        // the same as margin-left
    },
    'margin-bottom': function(value) {
        // the same as margin-left
    },
    'padding': function(value) {
        // http://www.w3.org/TR/CSS2/box.html#padding-properties
        var inheritValue = {"type": valueType.Inherit, "value": value},
            topValue, rightValue, bottomValue, leftValue, values;
        value = value.trim();
        
        if (value.toLowerCase() == 'inherit') {
            return {'top': inheritValue, 'right': inheritValue, 'bottom': inheritValue, 'left': inheritValue};
        } else {
            values = value.split(/\s+/);
            switch(values.length) {
            case 1:
                topValue = leftValue = bottomValue = rightValue = getPaddingValue(values[0]);
                break;
            case 2:
                topValue = bottomValue = getPaddingValue(values[0]);
                leftValue = rightValue = getPaddingValue(values[1]);
                break;
            case 3:
                topValue = getPaddingValue(values[0]);
                leftValue = rightValue = getPaddingValue(values[1]);
                bottomValue = getPaddingValue(values[2]);
            case 4:
                topValue = getPaddingValue(values[0]);
                rightValue = getPaddingValue(values[1]);
                bottomValue = getPaddingValue(values[2]);
                leftValue = getPaddingValue(values[3]);
                break;
            default:
                topValue = leftValue = bottomValue = rightValue = {"type": valueType.Invalid, "value": value};
            }
        }
        
        return {'top': topValue, 'right': rightValue, 'bottom': bottomValue, 'left': leftValue};
        
        function getPaddingValue(v) {
            // Negative value is illegal.
            if (/^-/.test(v)) {
                return {"type": valueType.Invalid, "value": v};
            }
            if (relLengthRegExp.test(v)) {
                return {"type": valueType.RelativeLength, "value": v};
            } else if (absLengthRegExp.test(v) || value == '0') {
                return {"type": valueType.AbsoluteLength, "value": v};
            } else {
                return {"type": valueType.Invalid, "value": v};
            }
        }
    },
    'padding-left': function(value) {
        // http://www.w3.org/TR/CSS2/box.html#padding-properties
        value = value.trim();
        // Negative value is illegal.
        if (/^-/.test(value)) {
            return {"type": valueType.Invalid, "value": value};
        }
        if (relLengthRegExp.test(value)) {
            return {"type": valueType.RelativeLength, "value": value};
        } else if (absLengthRegExp.test(value) || value == '0') {
            return {"type": valueType.AbsoluteLength, "value": value};
        } else if (value.toLowerCase() == 'inherit') {
            return {"type": valueType.Inherit, "value": value};
        } else {
            return {"type": valueType.Invalid, "value": value};
        }
    },
    'padding-right': function(value) {
        // the same as padding-left
    },
    'padding-top': function(value) {
        // the same as padding-left
    },
    'padding-bottom': function(value) {
        // the same as padding-left
    },
    'left': function(value) {
        // http://www.w3.org/TR/CSS2/visuren.html#position-props
        value = value.trim();
        if (relLengthRegExp.test(value)) {
            return {"type": valueType.RelativeLength, "value": value};
        } else if (absLengthRegExp.test(value) || value == '0') {
            return {"type": valueType.AbsoluteLength, "value": value};
        } else if (value.toLowerCase() == 'auto') {
            return {"type": valueType.Auto, "value": value};
        } else if (value.toLowerCase() == 'inherit') {
            return {"type": valueType.Inherit, "value": value};
        } else {
            return {"type": valueType.Invalid, "value": value};
        }
    },
    'right': function(value) {
        // the same as left
    },
    'top': function(value) {
        // the same as left
    },
    'bottom': function(value) {
        // the same as left
    },
    'border': function(value) {
        // http://www.w3.org/TR/2012/CR-css3-background-20120724/#the-border-shorthands
        var result = {},
            width, style, color, invalidValue, values;
        value = value.trim();
        values = value.split(/\s+/);
        for(var i = 0, length = values.length; i < length; i++) {
            width = isBorderWidthValue(values[i]);
            if (width) {
                result.width = width;
                continue;
            }
            style = isBorderStyleValue(values[i]);
            if (style) {
                result.style = style;
                continue;
            }
            color = isColorValue(values[i]);
            if (color) {
                result.color = color;
                continue;
            }
            invalidValue = {"type": valueType.Invalid, "value": values[i]},
            return {'width': invalidValue, 'style': invalidValue, 'color': invalidValue};
        }
        return result;
    },
    'border-left': function(value) {
        // the same as border
    },
    'border-right': function(value) {
        // the same as border
    },
    'border-top': function(value) {
        // the same as border
    },
    'border-bottom': function(value) {
        // the same as border
    },
    'border-color': function(value) {
        // http://www.w3.org/TR/2012/CR-css3-background-20120724/#the-border-color
        var colorRegExp = /^([a-f]+|#[\da-f]{3}|#[\da-f]{6}|rgb\(.+?\)|rgba\(.+?\)|hsl\(.+?\)|hsla\(.+?\))\s+/i,
            values = [], tmpValue, matchResult, top, right, bottom, left;
        tmpValue = value.trim() + ' ';
        while(tmpValue) {
            matchResult = tmpValue.match(colorRegExp);
            if (matchResult) {
                values.push(matchResult[1]);
                tmpValue = tmpValue.substring(matchResult[0].length);
            } else {
                top = right = bottom = left = {"type": valueType.Invalid, "value": value};
                return {'top': top, 'right': right, 'bottom': bottom, 'left': left};
            }
        }
        switch(values.length) {
        case 1:
            top = right = bottom = left = getColorValue(values[0]);
            break;
        case 2:
            top = bottom = getColorValue(values[0]);
            right = left = getColorValue(values[1]);
            break;
        case 3:
            top = getColorValue(values[0]);
            right = left = getColorValue(values[1]);
            bottom = getColorValue(values[2]);
            break;
        case 4:
            top = getColorValue(values[0]);
            right = getColorValue(values[1]);
            bottom = getColorValue(values[2]);
            left = getColorValue(values[3]);
            break;
        default:
            top = right = bottom = left = {"type": valueType.Invalid, "value": value};
        }
        return {'top': top, 'right': right, 'bottom': bottom, 'left': left};

        function getColorValue(v) {
            var color = isColorValue(v);
            return color?color:{'type': valueType.Invalid, 'value': value};
        }
    },
    'border-top-color': function(value) {
        // http://www.w3.org/TR/2012/CR-css3-background-20120724/#the-border-color
        var color = isColorValue(value.trim());
        return color?color:{'type': valueType.Invalid, 'value': value};
    },
    'border-right-color': function(value) {
        // the same as border-top-color
    },
    'border-bottom-color': function(value) {
        // the same as border-top-color
    },
    'border-left-color': function(value) {
        // the same as border-top-color
    },
    'border-style': function(value) {
        // http://www.w3.org/TR/2012/CR-css3-background-20120724/#the-border-style
        var top, right, bottom, left, values;
        values = value.split(/\s+/);
        switch(values.length) {
        case 1:
            top = right = bottom = left = getBorderStyleValue(values[0]);
            break;
        case 2:
            top = bottom = getBorderStyleValue(values[0]);
            right = left = getBorderStyleValue(values[1]);
            break;
        case 3:
            top = getBorderStyleValue(values[0]);
            right = left = getBorderStyleValue(values[1]);
            bottom = getBorderStyleValue(values[2]);
            break;
        case 4:
            top = getBorderStyleValue(values[0]);
            right = getBorderStyleValue(values[1]);
            bottom = getBorderStyleValue(values[2]);
            left = getBorderStyleValue(values[3]);
            break;
        default:
            top = right = bottom = left = {'type':valueType.Invalid, 'value':value};
        }
        return {'top': top, 'right': right, 'bottom': bottom, 'left': left};

        function getBorderStyleValue(v) {
            var style = isBorderStyleValue(v);
            return style?style:{'type':valueType.Invalid, 'value':v};
        }
    },
    'border-top-style': function(value) {
        // http://www.w3.org/TR/2012/CR-css3-background-20120724/#the-border-style
        var style = isBorderStyleValue(value.trim());
        return style?style:{'type': valueType.Invalid, 'value': value};
    },
    'border-right-style': function(value) {
        // the same as border-top-style
    },
    'border-bottom-style': function(value) {
        // the same as border-top-style
    },
    'border-left-style': function(value) {
        // the same as border-top-style
    },
    'border-width': function(value) {
        // http://www.w3.org/TR/2012/CR-css3-background-20120724/#the-border-width
        var topValue, rightValue, bottomValue, leftValue, values;
        value = value.trim();
        values = value.split(/\s+/);
        switch(values.length) {
        case 1:
            topValue = leftValue = bottomValue = rightValue = getBorderWidthValue(values[0]);
            break;
        case 2:
            topValue = bottomValue = getBorderWidthValue(values[0]);
            leftValue = rightValue = getBorderWidthValue(values[1]);
            break;
        case 3:
            topValue = getBorderWidthValue(values[0]);
            leftValue = rightValue = getBorderWidthValue(values[1]);
            bottomValue = getBorderWidthValue(values[2]);
        case 4:
            topValue = getBorderWidthValue(values[0]);
            rightValue = getBorderWidthValue(values[1]);
            bottomValue = getBorderWidthValue(values[2]);
            leftValue = getBorderWidthValue(values[3]);
            break;
        default:
            topValue = leftValue = bottomValue = rightValue = {"type": valueType.Invalid, "value": value};
        }
        
        return {'top': topValue, 'right': rightValue, 'bottom': bottomValue, 'left': leftValue};
        
        function getBorderWidthValue(v) {
            var width = isBorderWidthValue(v);
            return width?width:{"type": valueType.Invalid, "value": v};
        }
    },
    'border-left-width': function(value) {
        // http://www.w3.org/TR/2012/CR-css3-background-20120724/#the-border-width
        var width = isBorderWidthValue(value.trim());
        return width?width:{"type": valueType.Invalid, "value": value};
    },
    'border-right-width': function(value) {
        // the same as border-left-width
    },
    'border-top-width': function(value) {
        // the same as border-left-width
    },
    'border-bottom-width': function(value) {
        // the same as border-left-width
    },
    'border-radius': function(value) {
        // http://www.w3.org/TR/2012/CR-css3-background-20120724/#the-border-radius
        var topleft = [], topright = [], bottomright = [], bottomleft = [],
            horizontalValues, verticalValues, indexOfSlash, tmpValue;
        value = value.trim();
        indexOfSlash = value.indexOf('/');

        if (indexOfSlash != -1) {
            horizontalValues = value.substring(0, indexOfSlash).split(/\s+/);
            verticalValues = value.substring(indexOfSlash + 1).split(/\s+/);
        } else {
            horizontalValues = verticalValues = value.split(/\s+/);
        }

        [horizontalValues, verticalValues].forEach(function(values) {
            switch(values.length) {
            case 1:
                tmpValue = getBorderRadiusValue(values[0]);
                topleft.push(tmpValue); topright.push(tmpValue); bottomright.push(tmpValue); bottomleft.push(tmpValue);
                break;
            case 2:
                tmpValue = getBorderRadiusValue(values[0]);
                topleft.push(tmpValue); bottomright.push(tmpValue);
                tmpValue = getBorderRadiusValue(values[1]);
                topright.push(tmpValue); bottomleft.push(tmpValue);
                break;
            case 3:
                topleft.push(getBorderRadiusValue(values[0]));
                tmpValue = getBorderRadiusValue(values[1]);
                topright.push(tmpValue); bottomleft.push(tmpValue);
                bottomright.push(getBorderRadiusValue(values[2]));
                break;
            case 4:
                topleft.push(getBorderRadiusValue(values[0]));
                topright.push(getBorderRadiusValue(values[1]));
                bottomright.push(getBorderRadiusValue(values[2]));
                bottomleft.push(getBorderRadiusValue[values[3]]);
                break;
            default:
                tmpValue = {'type': valueType.Invalid, 'value': values.join(' ')};
                topleft.push(tmpValue); topright.push(tmpValue); bottomright.push(tmpValue); bottomleft.push(tmpValue);
            }
        });
        
        return {'topleft': topleft, 'topright': topright, 'bottomright': bottomright, 'bottomleft': bottomleft};

        function getBorderRadiusValue(v) {
            // Negative value is illegal.
            var radius = isBorderRadiusValue(v);
            return radius?radius:{'type': valueType.Invalid, 'value': v};
        }

    },
    'border-top-left-radius': function(value) {
        // http://www.w3.org/TR/2012/CR-css3-background-20120724/#the-border-radius
        var result = [], values, tmpValue;
        values = value.trim().split(/\s+/);
        switch(values.length) {
        case 1:
            tmpValue = getBorderRadiusValue(values[0]);
            result.push(tmpValue); result.push(tmpValue);
            break;
        case 2:
            result.push(getBorderRadiusValue(values[0]));
            result.push(getBorderRadiusValue(values[1]));
            break;
        default:
            tmpValue = {'type': valueType.Invalid, 'value': value};
            result.push(tmpValue); result.push(tmpValue);
        }
        return result;

        function getBorderRadiusValue(v) {
            // Negative value is illegal.
            var radius = isBorderRadiusValue(v);
            return radius?radius:{'type': valueType.Invalid, 'value': v};
        }
    },
    'border-top-right-radius': function(value) {
        // the same as border-top-left-radius
    },
    'border-bottom-right-radius': function(value) {
        // the same as border-top-left-radius
    },
    'border-bottom-left-radius': function(value) {
        // the same as border-top-left-radius
    },
    'border-image': function(value) {

    },
    'border-image-source': function(value) {

    },
    'border-image-slice': function(value) {

    },
    'border-image-width': function(value) {

    },
    'border-image-outset': function(value) {

    },
    'border-image-repeat': function(value) {

    },
    'font': function(value) {
        // http://www.w3.org/TR/css3-fonts/#propdef-font
        var styleRegExp, weightRegExp, variantRegExp, sizeKeywordRegExp, lengthRegExp, cellRegExp,
            keywords, result, tmpValue, matchResult, status;

        value = value.trim();
        keywords =['caption', 'icon', 'menu', 'message-box', 'small-caption', 'status-bar'];
        if  (keywords.indexOf(value.toLowerCase()) != -1) {
            return {'type': valueType.FontKeyword, 'value': value};
        } else if (value.toLowerCase() == 'inherit') {
            return {'type': valueType.Inherit, 'value': value};
        }

        styleRegExp = /^(normal|italic|oblique)\s+/i;
        weightRegExp = /^(normal|bold|100|200|300|400|500|600|700|800|900)\s+/i;
        variantRegExp = /^(normal|small-caps)\s+/i;
        sizeKeywordRegExp = /^(xx-small|x-small|small|medium|large|x-large|xx-large|larger|smaller)/i;
        lengthRegExp = /^([+-]?[0-9]+|[+-]?[0-9]*\.[0-9]+)(cm|mm|in|pt|pc|px|em|ex|ch|rem|vw|vh|vmin|%)/i;
        lengthWithSpaceRegExp = /^(([+-]?[0-9]+|[+-]?[0-9]*\.[0-9]+)(cm|mm|in|pt|pc|px|em|ex|ch|rem|vw|vh|vmin|%))\s+/i;

        tmpValue = value;
        result = {};
        status = 'start'; // statues: 'start' 'style' 'variant' 'weight' 'size' 'lineHeight' 'family'
        while(tmpValue) {
            switch(status) {
            case 'start':
                matchResult = tmpValue.match(styleRegExp);
                if (matchResult) {
                    result.style = {'type': valueType.FontStyleKeyword, 'value': matchResult[1]};
                    status = 'style';
                } else {
                    matchResult = tmpValue.match(variantRegExp);
                    if (matchResult) {
                        result.variant = {'type': valueType.FontVariantKeyword, 'value': matchResult[1]};
                        status = 'variant';
                    } else {
                        matchResult = tmpValue.match(weightRegExp);
                        if (matchResult) {
                            result.weight = {'type': valueType.FontWeightKeyword, 'value': matchResult[1]};
                            status = 'weight';
                        } else {
                            matchResult = tmpValue.match(sizeKeywordRegExp) || tmpValue.match(lengthRegExp);
                            if (matchResult) {
                                if (relLengthRegExp.test(matchResult[0])) {
                                    result.size = {'type': valueType.RelativeLength, 'value': matchResult[0]};
                                } else if (absLengthRegExp.test(matchResult[0])) {
                                    result.size = {'type': valueType.AbsoluteLength, 'value': matchResult[0]};
                                } else {
                                    result.size = {'type': valueType.FontSizeKeyword, 'value': matchResult[0]};
                                }
                                status = 'size';
                            } else {
                                return {'type': valueType.Invalid, 'value': value};
                            }
                        }
                    }
                }
                tmpValue = tmpValue.substring(matchResult[0].length);
                break;
            case 'style':
                matchResult = tmpValue.match(variantRegExp);
                if (matchResult) {
                    result.variant = {'type': valueType.FontVariantKeyword, 'value': matchResult[1]};
                    status = 'variant';
                } else {
                    matchResult = tmpValue.match(weightRegExp);
                    if (matchResult) {
                        result.weight = {'type': valueType.FontWeightKeyword, 'value': matchResult[1]};
                        status = 'weight';
                    } else {
                        matchResult = tmpValue.match(sizeKeywordRegExp) || tmpValue.match(lengthRegExp);
                        if (matchResult) {
                            if (relLengthRegExp.test(matchResult[0])) {
                                result.size = {'type': valueType.RelativeLength, 'value': matchResult[0]};
                            } else if (absLengthRegExp.test(matchResult[0])) {
                                result.size = {'type': valueType.AbsoluteLength, 'value': matchResult[0]};
                            } else {
                                result.size = {'type': valueType.FontSizeKeyword, 'value': matchResult[0]};
                            }
                            status = 'size';
                        } else {
                            return {'type': valueType.Invalid, 'value': value};
                        }
                    }
                }
                tmpValue = tmpValue.substring(matchResult[0].length);
                break;
            case 'variant':
                matchResult = tmpValue.match(weightRegExp);
                if (matchResult) {
                    result.weight = {'type': valueType.FontWeightKeyword, 'value': matchResult[1]};
                    status = 'weight';
                } else {
                    matchResult = tmpValue.match(sizeKeywordRegExp) || tmpValue.match(lengthRegExp);
                    if (matchResult) {
                        if (relLengthRegExp.test(matchResult[0])) {
                            result.size = {'type': valueType.RelativeLength, 'value': matchResult[0]};
                        } else if (absLengthRegExp.test(matchResult[0])) {
                            result.size = {'type': valueType.AbsoluteLength, 'value': matchResult[0]};
                        } else {
                            result.size = {'type': valueType.FontSizeKeyword, 'value': matchResult[0]};
                        }
                        status = 'size';
                    } else {
                        return {'type': valueType.Invalid, 'value': value};
                    }
                }
                tmpValue = tmpValue.substring(matchResult[0].length);
                break;
            case 'weight':
                matchResult = tmpValue.match(sizeKeywordRegExp) || tmpValue.match(lengthRegExp);
                if (matchResult) {
                    if (relLengthRegExp.test(matchResult[0])) {
                        result.size = {'type': valueType.RelativeLength, 'value': matchResult[0]};
                    } else if (absLengthRegExp.test(matchResult[0])) {
                        result.size = {'type': valueType.AbsoluteLength, 'value': matchResult[0]};
                    } else {
                        result.size = {'type': valueType.FontSizeKeyword, 'value': matchResult[0]};
                    }
                    status = 'size';
                } else {
                    return {'type': valueType.Invalid, 'value': value};
                }
                tmpValue = tmpValue.substring(matchResult[0].length);
                break;
            case 'size':
                if (tmpValue.charAt(0) == ' ') {
                    tmpValue = tmpValue.replace(/^\s+/, '');
                    if (tmpValue.charAt(0) == '/') {
                        tmpValue = tmpValue.replace(/^\/\s*/, '');
                        status = 'lineHeight';
                    } else {
                        status = 'family';
                    }
                } else if (tmpValue.charAt(0) == '/') {
                    tmpValue = tmpValue.replace(/^\/\s*/, '');
                    status = 'lineHeight';
                } else {
                    return {'type': valueType.Invalid, 'value': value};
                }
                break;
            case 'lineHeight':
                // lineHeight can be normal | <number> | <length>  | <percentage>
                matchResult = tmpValue.match(/^(normal)\s+/i);
                if (matchResult) {
                    result.lineHeight = {'type': valueType.LineHeightKeyword, 'value': matchResult[1]};
                } else {
                    matchResult = tmpValue.match(/^([+-]?[0-9]+|[+-]?[0-9]*\.[0-9]+)\s+/);
                    if (matchResult) {
                        result.lineHeight = {'type': valueType.Number, 'value': matchResult[1]};
                    } else {
                        matchResult = tmpValue.match(lengthWithSpaceRegExp);
                        if (matchResult) {
                            if (relLengthRegExp.test(matchResult[1])) {
                                result.lineHeight = {'type': valueType.RelativeLength, 'value': matchResult[1]};
                            } else {
                                result.lineHeight = {'type': valueType.AbsoluteLength, 'value': matchResult[1]};
                            }
                        } else {
                            return {'type': valueType.Invalid, 'value': value};
                        }
                    }
                }
                tmpValue = tmpValue.substring(matchResult[0].length);
                break;
            case 'family':
                result.family = {'type': valueType.FontFamily, 'value': tmpValue};
                break;
            default:
                // should never come into here
                return {'type': valueType.Invalid, 'value': value};
            }
        }
        if (result.size && result.family) {
            return result;
        }
        return {'type': valueType.Invalid, 'value': value};
    },
    'font-size': function(value) {
        // http://www.w3.org/TR/css3-fonts/#font-size-prop
        var absoluteKeywords = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'],
            relativeKeywords = ['larger', 'smaller'];
        value = value.trim();
        if (value.toLowerCase() == 'inherit') {
            return {'type': valueType.Inherit, 'value': value};
        } else if (absoluteKeywords.indexOf(value.toLowerCase()) != -1 ||
                   relativeKeywords.indexOf(value.toLowerCase()) != -1) {
            return {'type': valueType.FontSizeKeyword, 'value': value};
        } else if (relLengthRegExp.test(value)) {
            return {'type': valueType.RelativeLength, 'value': value};
        } else if (absLengthRegExp.test(value)) {
            return {'type': valueType.AbsoluteLength, 'value': value};
        }
        return {'type': valueType.Invalid, 'value': value};
    },
    'font-family': function(value) {
        // http://www.w3.org/TR/css3-fonts/#propdef-font-family
        var regExp, values, tmpValue, matchResult;

        if (value.trim().toLowerCase() == 'inherit') {
            return {'type': valueType.Inherit, 'value': value};
        }

        regExp = /^([^"',]+|".+?"|'.+?'),\s*/;
        tmpValue = value.trim() + ',';
        values = [];
        while(tmpValue) {
            matchResult = tmpValue.match(colorRegExp);
            if (matchResult) {
                values.push(matchResult[1]);
                tmpValue = tmpValue.substring(matchResult[0].length);
            } else {
                return {'type': valueType.Invalid, 'value': value};
            }
        }
        return {'type': valueType.FontFamily, 'value': values};
    },
    'font-style': function(value) {
        // http://www.w3.org/TR/css3-fonts/#propdef-font-style
        var keywords = ['normal', 'italic', 'oblique'];
        value = value.trim();
        if (keywords.indexOf(value.toLowerCase()) != -1) {
            return {'type': valueType.FontStyleKeyword, 'value': value};
        } else if (value.toLowerCase() == 'inherit') {
            return {'type': valueType.Inherit, 'value': value};
        }
        return {'type': valueType.Invalid, 'value': value};
    },
    'font-weight': function(value) {
        // http://www.w3.org/TR/css3-fonts/#propdef-font-weight
        var keywords = ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
        value = value.trim();
        if (keywords.indexOf(value.toLowerCase()) != -1) {
            return {'type': valueType.FontWeightKeyword, 'value': value};
        } else if (value.toLowerCase() == 'inherit') {
            return {'type': valueType.Inherit, 'value': value};
        }
        return {'type': valueType.Invalid, 'value': value};
    },
    'font-stretch': function(value) {
        // http://www.w3.org/TR/css3-fonts/#propdef-font-stretch
        var keywords = ['normal', 'ultra-condensed', 'extra-condensed', 'condensed', 'semi-condensed', 'semi-expanded', 'expanded', 'extra-expanded', 'ultra-expanded'];
        value = value.trim();
        if (keywords.indexOf(value.toLowerCase()) != -1) {
            return {'type': valueType.FontStretchKeyword, 'value': value};
        } else if (value.toLowerCase() == 'inherit') {
            return {'type': valueType.Inherit, 'value': value};
        }
        return {'type': valueType.Invalid, 'value': value};
    },
    'font-size-adjust': function(value) {
        // http://www.w3.org/TR/css3-fonts/#propdef-font-size-adjust
        value = value.trim();
        if (value.toLowerCase() == 'inherit') {
            return {'type': valueType.Inherit, 'value': value};
        } else if (value.toLowerCase() == 'none') {
            return {'type': valueType.None, 'value': value};
        } else if (numRegExp.test(value)) {
            return {'type': valueType.Number, 'value': value};
        }
        return {'type': valueType.Invalid, 'value': value};
    },
    'font-synthesis': function(value) {
        // http://www.w3.org/TR/css3-fonts/#propdef-font-synthesis
        value =value.trim();
        if (value.toLowerCase() == 'none') {
            return {'type': valueType.None, 'value': value};
        } else if (value.toLowerCase() == 'weight') {
            return {'weight': {'type':valueType.FontSynthesisKeyword, 'value': value}};
        } else if (value.toLowerCase() == 'style') {
            return {'style': {'type':valueType.FontSynthesisKeyword, 'value': value}};
        } else if (/^weight\s+style$|^style\s+weight$/i.test(value)) {
            return {'weight': {'type':valueType.FontSynthesisKeyword, 'value': value},
                    'style': {'type':valueType.FontSynthesisKeyword, 'value': value}};
        }
        return {'type': valueType.Invalid, 'value': value};
    },
    'background': function(value) {
        
    },
    'background-image': function(value) {
        
    },
    'background-color': function(value) {

    },
    'background-repeat': function(value) {

    },
    'background-attachment': function(value) {

    },
    'background-origin': function(value) {

    },
    'background-clip': function(value) {

    },
    'background-size': function(value) {

    },
    'background-position': function(value) {

    },
    'box-shadow': function(value) {
        
    },
    'grid-columns': function(value) {
        
    },
    'grid-rows': function(value) {
        
    },
    'transform': function(value) {
        
    },
    'perspective': function(value) {
        
    },
    'perspective-origin': function(value) {
        
    },
    'backface-visibility': function(value) {
        
    }
};

function isColorValue(v) {
    // var basicKeywords = ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green','lime', 'maroon',
    //                      'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'white', 'yellow'];
    var extendedKeywords = ['aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure',
                            'beige', 'bisque', 'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood',
                            'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan',
                            'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey', 'darkkhaki',
                            'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen',
                            'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet',
                            'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue',
                            'firebrick', 'floralwhite', 'forestgreen', 'fuchsia',
                            'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'grey',
                            'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki',
                            'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan',
                            'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey', 'lightpink', 'lightsalmon','lightseagreen',
                            'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen',
                            'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue',
                            'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin',
                            'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid',
                            'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple',
                            'red', 'rosybrown', 'royalblue',
                            'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue',
                            'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise',
                            'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen'],
        specialKeywords = ['transparent', 'currentColor'],
        rgbRegExp = /^rgb\(((\s*-?\d+\s*,){2}\s*-?\d+\s*|(\s*-?\d+%\s*,){2}\s*-?\d+%\s*)\)$/i,
        rgbaRegExp = /^rgba\(((\s*-?\d+\s*,){3}|(\s*-?\d+%\s*,){3})\s*-?([0-9]+|[0-9]*\.[0-9]+)\s*\)$/i,
        hslRegExp = /^hsl\(\s*-?\d+\s*,\s*-?\d+%\s*,\s*-?\d+%\s*\)$/i,
        hslaRegExp =/^hsla\(\s*-?\d+\s*,(\s*-?\d+%\s*,){2}\s*-?([0-9]+|[0-9]*\.[0-9]+)\s*\)/i
        hexRegExp = /^#([\da-fA-F]{3}|[\da-fA-F]{6})$/;
        
        if (extendedKeywords.indexOf(v) != -1 ||
            specialKeywords.indexOf(v) != -1 ||
            hexRegExp.test(v) ||
            rgbRegExp.test(v) || rgbaRegExp.test(v) ||
            hslRegExp.test(v) || hslaRegExp.test(v)) {
            return {'type': valueType.Color, 'value': v};
        }
        if (v.toLowerCase() == 'inherit') {
            return {'type': valueType.Inherit, 'value':v};
        }
        return null;
}

function isBorderWidthValue(v) {
    // http://www.w3.org/TR/CSS2/box.html#value-def-border-width
    // Negative value is illegal.
    if (/^-/.test(v)) {
        return null;
    }
    if (relLengthRegExp.test(v)) {
        return {'type': valueType.RelativeLength, 'value': v};
    } else if(absLengthRegExp.test(v) || v == '0') {
        return {'type': valueType.AbsoluteLength, 'value': v};
    } else if(v.toLowerCase() == 'thin' || v.toLowerCase() == 'medium' || v.toLowerCase() == 'thick') {
        return {'type': valueType.BorderWidthKeyword, 'value': v};
    } else if (v.toLowerCase() == 'inherit') {
        return {'type': valueType.Inherit, 'value': v};
    }
    return null;
}

function isBorderStyleValue(v) {
    // http://www.w3.org/TR/CSS2/box.html#border-style-properties
    var styles = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];
    if (styles.indexOf(v) != -1) {
        return {'type': valueType.BorderStyleKeyword, 'value': v};
    }
    if (v.toLowerCase() == 'inherit') {
        return {'type': valueType.Inherit, 'value': v};
    }
    return null;
}

function isBorderRadiusValue(v) {
    // http://www.w3.org/TR/2012/CR-css3-background-20120724/#the-border-radius
    // Negative value is illegal.
    if (/^-/.test(value)) {
        return null;
    }

    if (relLengthRegExp.test(v)) {
        return {'type': valueType.RelativeLength, 'value': v};
    } else if(absLengthRegExp.test(v) || v == '0') {
        return {'type': valueType.AbsoluteLength, 'value': v};
    } else if (v.toLowerCase() == '') {
        return {'type': valueType.Inherit, 'value': v};
    }
    return null;
}